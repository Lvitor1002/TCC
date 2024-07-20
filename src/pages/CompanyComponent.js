import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";
import { useNavigate } from 'react-router-dom';

class CompanyComponent extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyDataList: [],
    dataLoaded: false,
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    const apiHandler = new APIHandler();
    const response = await apiHandler.saveCompanyData(
      event.target.name.value,
      event.target.license_no.value,
      event.target.address.value,
      event.target.contact_no.value,
      event.target.email.value,
      event.target.description.value
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
  }

  //This Method Work When Our Page is Ready
  componentDidMount() {
    this.fetchCompanyData();
  }

  async fetchCompanyData() {
    const apihandler = new APIHandler();
    const companydata = await apihandler.fetchAllCompany();
    console.log(companydata);
    this.setState({ companyDataList: companydata.data.data });
    this.setState({ dataLoaded: true });
  }

  viewCompanyDetails = (company_id) => {
    const { navigate } = this.props;
    navigate(`/companydetails/${company_id}`);
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Empresas</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">

                  <h2>INCLUIR EMPRESA</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="email_address">Nome</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Digite aqui o nome da empresa"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Nº Licença</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="license_no"
                          name="license_no"
                          className="form-control"
                          placeholder="Digite aqui o número da licença"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Endereço</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder="Digite aqui o endereço da empresa"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Nº Contato</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="contact_no"
                          name="contact_no"
                          className="form-control"
                          placeholder="Digite aqui o número para contato da empresa"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Email</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Digite aqui o email da empresa"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Descrição</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Digite aqui alguma descrição da empresa"
                        />
                      </div>
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Adicionar"
                        : "Adicionando, um momento..."}
                    </button>
                    <br />
                    {this.state.errorRes === false &&
                    this.state.sendData === true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes === true &&
                    this.state.sendData === true ? (
                      <div className="alert alert-danger">
                        <strong>Failed!</strong>
                        {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
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
                  {this.state.dataLoaded === false ? (
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
                  ) : (
                    ""
                  )}
                  <h2>TODAS AS EMPRESAS</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Nome</th>
                        <th>Nº Licença</th>
                        <th>Endereço</th>
                        <th>Nº Contato</th>
                        <th>Email</th>
                        <th>Descrição</th>
                        <th>Data</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.companyDataList.map((company) => (
                        <tr key={company.id}>
                          <td>{company.id}</td>
                          <td>{company.name}</td>
                          <td>{company.license_no}</td>
                          <td>{company.address}</td>
                          <td>{company.contact_no}</td>
                          <td>{company.email}</td>
                          <td>{company.description}</td>
                          <td>{new Date(company.added_on).toLocaleString()}</td>
                          <td>
                            <button
                              className="btn btn-block btn-warning"
                              onClick={() =>
                                this.viewCompanyDetails(company.id)
                              }
                            >
                              Exibir
                            </button>
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
  }
}

function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withNavigation(CompanyComponent);
