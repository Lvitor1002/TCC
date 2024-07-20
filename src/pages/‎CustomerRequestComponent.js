import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";

class CustomerRequestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.completeCustomerRequestDetails = this.completeCustomerRequestDetails.bind(
      this
    );
    this.hideCustomerRequest = this.hideCustomerRequest.bind(this);
    this.formRef = React.createRef();
  }

  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    customerRequestDataList: [],
    hiddenRequests: {},
    dataLoaded: false,
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.saveCustomerRequestData(
      event.target.name.value,
      event.target.phone.value,
      event.target.medicine_details.value,
      event.target.prescription.files[0]
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
    this.fetchCustomerRequestData();
    this.formRef.current.reset();
  }

  componentDidMount() {
    this.fetchCustomerRequestData();
  }

  async fetchCustomerRequestData() {
    var apihandler = new APIHandler();
    var customerRequestData = await apihandler.fetchAllCustomerRequest();
    console.log(customerRequestData);
    this.setState({ customerRequestDataList: customerRequestData.data.data });
    this.setState({ dataLoaded: true });
  }

  async completeCustomerRequestDetails(
    customer_id,
    name,
    phone,
    medicine_details
  ) {
    console.log(customer_id);
    var apihandler = new APIHandler();
    var customerRequestData = await apihandler.updateCustomerRequest(
      customer_id,
      name,
      phone,
      medicine_details
    );
    console.log(customerRequestData);
    this.fetchCustomerRequestData();
  }

  hideCustomerRequest(id) {
    this.setState((prevState) => ({
      hiddenRequests: { ...prevState.hiddenRequests, [id]: true },
    }));
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Gerenciar solicitações de medicamentos</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>ADICIONAR PEDIDO DE CLIENTE</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit} ref={this.formRef}>
                    <label htmlFor="email_address">Nome</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Digite o nome do cliente"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Contato</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className="form-control"
                          placeholder="Digite o contato do cliente"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Detalhes do Medicamento</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medicine_details"
                          name="medicine_details"
                          className="form-control"
                          placeholder="Digite aqui os detalhes importantes do medicamento do cliente"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Imagem do Medicamento</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="file"
                          id="prescription"
                          name="prescription"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Adicionar solicitação do cliente"
                        : "Adicionando.."}
                    </button>
                    <br />
                    {this.state.errorRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Sucesso!</strong> {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes == true &&
                    this.state.sendData == true ? (
                      <div className="alert alert-danger">
                        <strong>Falha!</strong>
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
                  {this.state.dataLoaded == false ? (
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
                  <h2>Todas as solicitações de medicamentos do cliente</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Contato</th>
                        <th>Detalhes do Medicamento</th>
                        <th>Imagem do Medicamento</th>
                        <th>Status</th>
                        <th>Adicionado em:</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.customerRequestDataList.map(
                        (CustomerRequest) =>
                          !this.state.hiddenRequests[CustomerRequest.id] && (
                            <tr key={CustomerRequest.id}>
                              <td>{CustomerRequest.id}</td>
                              <td>{CustomerRequest.customer_name}</td>
                              <td>{CustomerRequest.phone}</td>
                              <td>{CustomerRequest.medicine_details}</td>
                              <td>
                                {CustomerRequest.prescription == null ? (
                                  ""
                                ) : (
                                  <img
                                    src={CustomerRequest.prescription}
                                    style={{ width: 100, height: 100 }}
                                  />
                                )}
                              </td>
                              <td>
                                {CustomerRequest.status == 0
                                  ? "Pendente"
                                  : "Completo e Confirmado"}
                              </td>
                              <td>
                                {new Date(
                                  CustomerRequest.added_on
                                ).toLocaleString()}
                              </td>
                              <td>
                                {CustomerRequest.status == 0 ? (
                                  <div>
                                    <button
                                      className="btn btn-block btn-warning"
                                      onClick={() =>
                                        this.completeCustomerRequestDetails(
                                          CustomerRequest.id,
                                          CustomerRequest.customer_name,
                                          CustomerRequest.phone,
                                          CustomerRequest.medicine_details
                                        )
                                      }
                                    >
                                      Pendente
                                    </button>
                                    <button
                                      className="btn btn-block btn-danger"
                                      onClick={() =>
                                        this.hideCustomerRequest(
                                          CustomerRequest.id
                                        )
                                      }
                                    >
                                      Excluir
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <button
                                      className="btn btn-block btn-success"
                                    >
                                      Completo e Confirmado
                                    </button>
                                    <button
                                      className="btn btn-block btn-danger"
                                      onClick={() =>
                                        this.hideCustomerRequest(
                                          CustomerRequest.id
                                        )
                                      }
                                    >
                                      Excluir
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          )
                      )}
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

export default CustomerRequestComponent;
