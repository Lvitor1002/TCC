import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";

const CompanyAddBankComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
  });

  const formSubmit = async (event) => {
    event.preventDefault();
    setState({ ...state, btnMessage: 1 });

    const apiHandler = new APIHandler();
    const response = await apiHandler.saveCompanyBankData(
      event.target.bank_account_no.value,
      event.target.ifsc_no.value,
      id
    );

    console.log(response);
    setState({
      ...state,
      btnMessage: 0,
      errorRes: response.data.error,
      errorMessage: response.data.message,
      sendData: true
    });
  };

  const handleBackToDetails = () => {
    navigate(`/companydetails/${id}`);
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h2>GERÊNCIAR EMPRESAS</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>INCLUIR BANCO DA EMPRESA #{id}</h2>
              </div>
              <div className="body">
                <form onSubmit={formSubmit}>
                  <label htmlFor="bank_account_no">Nº Conta</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="bank_account_no"
                        name="bank_account_no"
                        className="form-control"
                        placeholder="Digite aqui o número da conta"
                      />
                    </div>
                  </div>
                  <label htmlFor="ifsc_no">Nº IFSC</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="ifsc_no"
                        name="ifsc_no"
                        className="form-control"
                        placeholder="Digite aqui o número IFSC"
                      />
                    </div>
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary m-t-15 waves-effect btn-block"
                    disabled={state.btnMessage === 0 ? false : true}
                  >
                    {state.btnMessage === 0
                      ? "Adicionar Banco da Empresa"
                      : "Adicionando, um momento..."}
                  </button>
                  <br />
                  {state.errorRes === false && state.sendData === true ? (
                    <div className="alert alert-success">
                      <strong>Success!</strong> {state.errorMessage}.
                      <button 
                        onClick={handleBackToDetails}
                        className='btn btn-info'
                      >
                        Voltar para detalhes
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  {state.errorRes === true && state.sendData === true ? (
                    <div className="alert alert-danger">
                      <strong>Failed!</strong>
                      {state.errorMessage}.
                    </div>
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyAddBankComponent;
