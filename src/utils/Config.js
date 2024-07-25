class Config {
  static apiUrl = "https://djangobackend-wha5.vercel.app";
  static loginUrl = this.apiUrl + "/api/gettoken/";
  static refreshApiUrl = this.apiUrl + "/api/resfresh_token/";
  static companyApiUrl = this.apiUrl + "/api/company/";
  static homeApiUrl = this.apiUrl + "/api/home_api/";
  static customerRequestApiUrl = this.apiUrl + "/api/customer_request/";
  static medicineNameApiUrl = this.apiUrl + "/api/medicinebyname/";
  static companyBankApiUrl = this.apiUrl + "/api/companybank/";
  static generateBillApiUrl = this.apiUrl + "/api/generate_bill_api/";
  static companyAccountApiUrl = this.apiUrl + "/api/companyaccount/";
  static companyOnly = this.apiUrl + "/api/companyonly/";
  static employeeApiURL = this.apiUrl + "/api/employee/";
  static medicineApiUrl = this.apiUrl + "/api/medicine/";
  static employeeBankApiUrl = this.apiUrl + "/api/employee_all_bank/";
  static employeeBankApiUrlBYID =
    this.apiUrl + "/api/employee_bankby_id/";
  static employeeSalaryApiUrl =
    this.apiUrl + "/api/employee_all_salary/";
  static employeeSalaryByIdApiUrl =
    this.apiUrl + "/api/employee_salaryby_id/";
  static logoutPageUrl = "/logout";
  static homeUrl = "/home";

  static sidebarItem = [
    { index: "0", title: "Inicio", url: "/home", icons: "home" },
    { index: "1", title: "Empresa Farmacêutica", url: "/company", icons: "assessment" },
    { index: "2", title: "Adicionar Medicamento", url: "/addMedicine", icons: "assessment" },
    { index: "3", title: "Gerenciar Medicamento", url: "/manageMedicine", icons: "assessment" },
    { index: "4", title: "Gerenciar Conta da Empresa", url: "/manageCompanyAccount", icons: "assessment" },
    { index: "5", title: "Gerenciar Funcionário", url: "/employeeManage", icons: "assessment" },
    { index: "6", title: "Gerar Conta", url: "/generateBill", icons: "assessment" },
    { index: "7", title: "Solicitação dos Clientes", url: "/customerRequest", icons: "assessment" },
  ];
}

export default Config;
