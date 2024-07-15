import React, { useState, useEffect } from "react";
import APIHandler from "../utils/APIHandler";
import { useNavigate } from 'react-router-dom';

const EmployeeComponent = () => {
  const navigate = useNavigate();
  const [errorRes, setErrorRes] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [btnMessage, setBtnMessage] = useState(0);
  const [sendData, setSendData] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const formSubmit = async (event) => {
    event.preventDefault();
    setBtnMessage(1);

    const apiHandler = new APIHandler();
    const response = await apiHandler.saveEmployeeData({
      name: event.target.name.value,
      joining_date: event.target.joining_date.value,
      phone: event.target.phone.value,
      address: event.target.address.value
    });

    console.log(response);
    setBtnMessage(0);
    setErrorRes(response.data.error);
    setErrorMessage(response.data.message);
    setSendData(true);
    updateDataAgain();
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    updateDataAgain();
  };

  const updateDataAgain = async () => {
    const apiHandler = new APIHandler();
    const employeeDataList = await apiHandler.fetchEmployee();
    setEmployeeList(employeeDataList.data.data);
    setDataLoaded(true);
  };

  const showEmployeeDetails = (eid) => {
    navigate(`/employeedetails/${eid}`);
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h2>GERENCIAR FUNCIONÁRIO</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Adicionar Funcionário</h2>
              </div>
              <div className="body">
                <form onSubmit={formSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label htmlFor="name">Nome</label>
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Digite aqui o Nome"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="joining_date">Data de ingresso</label>
                      <div className="form-group">
                        <input
                          type="date"
                          id="joining_date"
                          name="joining_date"
                          className="form-control"
                          placeholder="Digite a data de ingresso"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <label htmlFor="phone">Telefone Celular</label>
                      <div className="form-group">
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className="form-control"
                          placeholder="Exemplo: 14988352470"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="address">Endereço</label>
                      <div className="form-group">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder="Digite aqui o Endereço"
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary m-t-15 waves-effect btn-block"
                    disabled={btnMessage === 1}
                  >
                    {btnMessage === 0
                      ? "Adicionar Funcionário"
                      : "Adicionando funcionário, aguarde..."}
                  </button>
                  <br />
                  {sendData && (
                    <div className={`alert ${errorRes ? 'alert-danger' : 'alert-success'}`}>
                      <strong>{errorRes ? 'Falha!' : 'Sucesso!'}</strong> {errorMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                {!dataLoaded && (
                  <div className="text-center">
                    <div className="preloader pl-size-xl">
                      <div className="spinner-layer">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <h2>Todos os dados dos funcionários</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Nome</th>
                      <th>Data de ingresso</th>
                      <th>Telefone Celular</th>
                      <th>Endereço</th>
                      <th>Adicionado em:</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {employeeList.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.joining_date}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.address}</td>
                        <td>{new Date(employee.added_on).toLocaleString()}</td>
                        <td>
                    
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeComponent;
