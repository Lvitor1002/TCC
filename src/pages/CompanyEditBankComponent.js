import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import APIHandler from '../utils/APIHandler';

const CompanyEditBankComponent = () => {
    const { company_id, id } = useParams(); // Captura os parâmetros 'company_id' e 'id' da rota
    const navigate = useNavigate();

    const [state, setState] = useState({
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        ifsc_no: "",
        bank_account_no: "",
        dataLoaded: false
    });

    useEffect(() => {
        fetchCompanyBankData(id); // Chama a função para carregar os dados do banco da empresa
    }, [id]); // Observa mudanças em 'id' para recarregar os dados

    const fetchCompanyBankData = async (id) => {
        try {
            const apiHandler = new APIHandler();
            const companydata = await apiHandler.fetchCompanyBankDetails(id);
            setState(prevState => ({
                ...prevState,
                bank_account_no: companydata.data.data.bank_account_no,
                ifsc_no: companydata.data.data.ifsc_no,
                dataLoaded: true
            }));
        } catch (error) {
            console.error("Erro ao buscar dados do banco da empresa:", error);
        }
    };

    const formSubmit = async (event) => {
        event.preventDefault();
        setState({ ...state, btnMessage: 1 });

        const apiHandler = new APIHandler();
        try {
            const response = await apiHandler.editCompanyBankData(
                event.target.bank_account_no.value,
                event.target.ifsc_no.value,
                company_id, // Use 'company_id' capturado de useParams() para identificar a empresa
                id // Use 'id' capturado de useParams() para identificar o banco da empresa
            );
            setState({
                ...state,
                btnMessage: 0,
                errorRes: response.data.error,
                errorMessage: response.data.message,
                sendData: true
            });
        } catch (error) {
            console.error("Erro ao editar banco da empresa:", error);
            setState({
                ...state,
                btnMessage: 0,
                errorRes: true,
                errorMessage: "Falha ao editar banco da empresa",
                sendData: true
            });
        }
    };

    const handleBackToDetails = () => {
        navigate(`/companydetails/${company_id}`);
    };

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="block-header">
                    <h2>GERENCIAR EMPRESAS</h2>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                            <div className="header">
                                <h2>EDITAR BANCO DA EMPRESA #{company_id}</h2>
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
                                                defaultValue={state.bank_account_no}
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
                                                defaultValue={state.ifsc_no}
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
                                            ? "Editar Banco da Empresa"
                                            : "Editando, um momento..."}
                                    </button>
                                    <br />
                                    {state.errorRes === false && state.sendData === true ? (
                                        <div className="alert alert-success">
                                            <strong>Sucesso!</strong> {state.errorMessage}.
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
                                            <strong>Falha!</strong> {state.errorMessage}.
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

export default CompanyEditBankComponent;
