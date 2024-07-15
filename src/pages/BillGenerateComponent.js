import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";
import AutoCompleteMedicine from "../components/AutoCompleteMedicine";

class BillGenerateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    medicineDetails: [
      {
        sr_no: 1,
        id: 0,
        medicine_name: "",
        qty: "",
        qty_type: "",
        unit_price: "",
        c_gst: "",
        s_gst: "",
        amount: "",
      },
    ],
    currentSrno: 1,
  };

  async formSubmit(event) {
    event.preventDefault();
    console.log(this.state.medicineDetails);
    console.log(event.target.customer_name.value);
    console.log(event.target.address.value);
    console.log(event.target.phone.value);

    this.setState({ btnMessage: 1 });

    var customer_name = event.target.customer_name.value;
    var address = event.target.address.value;
    var phone = event.target.phone.value;

    var apiHandler = new APIHandler();
    var response = await apiHandler.generateBill(
      event.target.customer_name.value,
      event.target.address.value,
      event.target.phone.value,
      this.state.medicineDetails
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });

    this.billGeneratePrint(
      customer_name,
      address,
      phone,
      this.state.medicineDetails
    );
  }

  billGeneratePrint(customer_name, address, phone, medicineDetails) {
    var billDetails =
      "<style> table{ width:100%;border-collapse:collapse; } td{ padding:5px } th { padding:5px } </style><div>";
    billDetails += "<table border='1'>";
    billDetails += "<tr>";
    billDetails += "<td style='text-align:center' colspan='7'>";
    billDetails += "Fatura do cliente";
    billDetails += "</td>";
    billDetails += "</tr>";
    billDetails += "<tr>";
    billDetails += "<td colspan='2'>";
    billDetails += "Nome : " + customer_name;
    billDetails += "</td>";
    billDetails += "<td colspan='3'>";
    billDetails += "Endereço : " + address;
    billDetails += "</td>";
    billDetails += "<td colspan='2'>";
    billDetails += "Contato : " + phone;
    billDetails += "</td>";
    billDetails += "</tr>";
    billDetails += "<tr>";
    billDetails += "<th>";
    billDetails += "";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "Nome";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "Quantidade";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "Tipo";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "Preço Unitário";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "ICMS";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "Total";
    billDetails += "</th>";
    billDetails += "</tr>";
    var totalamt = 0;

    for (var i = 0; i < medicineDetails.length; i++) {
      billDetails += "<tr>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].sr_no;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].medicine_name;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].qty;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].qty_type;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].unit_price;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails +=
        "" + medicineDetails[i].c_gst + " " + medicineDetails[i].s_gst;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].amount;
      billDetails += "</td>";
      billDetails += "</tr>";

      totalamt += parseInt(medicineDetails[i].amount);
    }

    billDetails += "<tr>";
    billDetails +=
      "<td colspan='6' style='text-align:right;font-weight:bold;background:green;color:white'>";
    billDetails += "Total : " + totalamt;
    billDetails += "<td>";
    billDetails += "</tr>";
    billDetails += "</table>";
    billDetails += "</div>";

    var mywindow = window.open(
      "",
      "Bill Print",
      "height=650&width=900&top=100&left=100"
    );

    mywindow.document.write(billDetails);
    mywindow.print();
  }

  AddMedicineDetails = () => {
    this.state.currentSrno = this.state.currentSrno + 1;
    var srno = this.state.currentSrno;
    this.state.medicineDetails.push({
      sr_no: srno,
      medicine_name: "",
      qty: "",
      qty_type: "",
      unit_price: "",
      c_gst: "",
      s_gst: "",
      amount: "",
    });
    this.setState({});
  };

  RemoveMedicineDetails = () => {
    this.state.currentSrno = this.state.currentSrno - 1;
    if (this.state.medicineDetails.length > 1) {
      this.state.medicineDetails.pop();
    }
    this.setState({});
  };

  showDataInInputs = (index, item) => {
    console.log(index);
    console.log(item);
    this.state.medicineDetails[index].id = item.id;
    this.state.medicineDetails[index].qty = 1;
    this.state.medicineDetails[index].qty_type = "Pieces";
    this.state.medicineDetails[index].unit_price = item.sell_price;
    this.state.medicineDetails[index].c_gst = item.c_gst;
    this.state.medicineDetails[index].s_gst = item.s_gst;
    this.state.medicineDetails[index].medicine_name = item.name;
    this.state.medicineDetails[index].amount =
      parseInt(item.sell_price) + parseInt(item.c_gst) + parseInt(item.s_gst);
    this.setState({});
  };

  qtyChangeUpdate = (event) => {
    var value = event.target.value;
    var index = event.target.dataset.index;

    this.state.medicineDetails[index].amount =
      (parseInt(this.state.medicineDetails[index].unit_price) +
        parseInt(this.state.medicineDetails[index].c_gst) +
        parseInt(this.state.medicineDetails[index].s_gst)) *
      value;
    this.state.medicineDetails[index].qty = value;
    this.setState({});
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Gerar fatura</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Gerar fatura para clientes</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="email_address">Nome do cliente :</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="customer_name"
                              name="customer_name"
                              className="form-control"
                              placeholder="Digite aqui o nome do cliente "
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="email_address">Endereço : </label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="address"
                              name="address"
                              className="form-control"
                              placeholder="Digite aqui o endereço do cliente"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="email_address">Contato :</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              className="form-control"
                              placeholder="Digite aqui o contato/celular do cliente"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <br />
                    <h4>Detalhes do medicamento</h4>
                    {this.state.medicineDetails.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="col-lg-2">
                          <label htmlFor="email_address"> </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="sr_no"
                                name="sr_no"
                                className="form-control"
                                placeholder="Enter SR No."
                                defaultValue={index + 1}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="email_address">
                            Nome do Medicamento :{" "}
                          </label>
                          <div className="form-group">
                            <div className="form-line">
                              <AutoCompleteMedicine
                                itemPostion={index}
                                showDataInInputs={this.showDataInInputs}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="email_address">Quantidade: </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="qty"
                                name="qty"
                                className="form-control"
                                placeholder="Digite a Quantidade"
                                defaultValue={item.qty}
                                data-index={index}
                                onChange={this.qtyChangeUpdate}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="email_address">Tipo de Medicamento: </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="qty_type"
                                name="qty_type"
                                className="form-control"
                                placeholder="Digite o Tipo"
                                defaultValue={item.qty_type}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="email_address">Preço Unitário : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="unit_price"
                                name="unit_price"
                                className="form-control"
                                placeholder="Digite o preço unitário"
                                defaultValue={item.unit_price}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="email_address">Total : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="amount"
                                name="amount"
                                className="form-control"
                                placeholder="Total"
                                defaultValue={item.amount}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="row">
                      <div className="col-lg-6">
                        <button
                          onClick={this.AddMedicineDetails}
                          className="btn btn-block btn-success"
                          type="button"
                        >
                          Adicionar um Detalhe
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          onClick={this.RemoveMedicineDetails}
                          className="btn btn-block btn-warning"
                          type="button"
                        >
                          Remover o Detalhe
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Gerar"
                        : "Gerando..."}
                    </button>
                    <br />
                    {this.state.errorRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes == true &&
                    this.state.sendData == true ? (
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
        </div>
      </section>
    );
  }
}

export default BillGenerateComponent;