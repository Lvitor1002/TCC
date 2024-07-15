import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthHandler from '../utils/AuthHandler';
import APIHandler from '../utils/APIHandler';

const CompanyDetailsComponent = () => {
    const { id } = useParams();  // Hook useParams para pegar o id da URL
    const navigate = useNavigate();  // Hook useNavigate para navegação
    const [state, setState] = useState({
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        companyBank: [],
        name: "",
        license_no: "",
        address: "",
        contact_no: "",
        email: "",
        description: "",
        dataLoaded: false
    });



    const formSubmit = async (event) => {
        event.preventDefault();
        setState(prevState => ({ ...prevState, btnMessage: 1 }));
        const apiHandler = new APIHandler();
        try {
            const response = await apiHandler.editCompanyData(
                event.target.name.value,
                event.target.license_no.value,
                event.target.address.value,
                event.target.contact_no.value,
                event.target.email.value,
                event.target.description.value,
                id
            );
            setState(prevState => ({
                ...prevState,
                btnMessage: 0,
                errorRes: response.data.error,
                errorMessage: response.data.message,
                sendData: true,
            }));
        } catch (error) {
            console.error("Erro ao salvar empresa:", error);
            setState(prevState => ({
                ...prevState,
                btnMessage: 0,
                errorRes: true,
                errorMessage: "Falha ao salvar os dados da empresa",
                sendData: true,
            }));
        }
    };
    useEffect(() => {
        fetchCompanyData();
    }, []);

    const fetchCompanyData = async () => {
        const apiHandler = new APIHandler();
        const companydata = await apiHandler.fetchCompanyDetails(id);
        console.log(companydata);
        setState(prevState => ({
            ...prevState,
            companyBank: companydata.data.data.company_bank,
            name: companydata.data.data.name,
            license_no: companydata.data.data.license_no,
            address: companydata.data.data.address,
            contact_no: companydata.data.data.contact_no,
            email: companydata.data.data.email,
            description: companydata.data.data.description,
            dataLoaded: true
        }));
    };

    const viewCompanyDetails = (company_id) => {
        console.log(company_id);
        console.log(state);
    };

    const AddCompanyBank = () => {
        navigate(`/addCompanyBank/${id}`);
    };

    const EditCompanyBank = (company_bank_id) => {
        console.log(company_bank_id);
        navigate(`/editcompanybank/${id}` +id+"/"+ company_bank_id);
        //navigate(`/editcompanybank/${id}/${company_bank_id}`);

    };

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="block-header">
                    <h2>GERÊNCIAR EMPRESA</h2>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                            <div className="header">
                                {state.dataLoaded === false ? (
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
                                <h2>Editar Empresa</h2>
                            </div>
                            <div className="body">
                                <form onSubmit={formSubmit}>
                                    <label htmlFor="name">Nome</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder="Digite aqui o nome da empresa"
                                                defaultValue={state.name}
                                            />
                                        </div>
                                    </div>
                                    <label htmlFor="license_no">Licença</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input
                                                type="text"
                                                id="license_no"
                                                name="license_no"
                                                className="form-control"
                                                placeholder="Digite aqui o número da licença"
                                                defaultValue={state.license_no}
                                            />
                                        </div>
                                    </div>
                                    <label htmlFor="address">Endereço</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                className="form-control"
                                                placeholder="Digite aqui o endereço da empresa"
                                                defaultValue={state.address}
                                            />
                                        </div>
                                    </div>
                                    <label htmlFor="contact_no">Contato</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input
                                                type="text"
                                                id="contact_no"
                                                name="contact_no"
                                                className="form-control"
                                                placeholder="Digite aqui o número para contato da empresa"
                                                defaultValue={state.contact_no}
                                            />
                                        </div>
                                    </div>
                                    <label htmlFor="email">Email</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Digite aqui o email da empresa"
                                                defaultValue={state.email}
                                            />
                                        </div>
                                    </div>
                                    <label htmlFor="description">Descrição</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input
                                                type="text"
                                                id="description"
                                                name="description"
                                                className="form-control"
                                                placeholder="Digite aqui alguma descrição da empresa"
                                                defaultValue={state.description}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-primary m-t-15 waves-effect btn-block"
                                        disabled={state.btnMessage !== 0}
                                    >
                                        {state.btnMessage === 0 ? "Salvar" : "Salvando, um momento.."}
                                    </button>
                                    <br />
                                    {state.errorRes === false && state.sendData === true ? (
                                        <div className="alert alert-success">
                                            <strong>Success!</strong> {state.errorMessage}.
                                        </div>
                                    ) : ""}
                                    {state.errorRes === true && state.sendData === true ? (
                                        <div className="alert alert-danger">
                                            <strong>Failed!</strong> {state.errorMessage}.
                                        </div>
                                    ) : ""}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
              
            </div>
        </section>
    );
};

export default CompanyDetailsComponent;
