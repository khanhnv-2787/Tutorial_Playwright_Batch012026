import { DashBoardPage } from "./pages/dashboardPage";
import { LoginPage } from "./pages/loginPage";


const testLogin = async () => {
	const loginPage = new LoginPage();
	const dashBoardPage = new DashBoardPage();

  await loginPage.goToLoginPage();
  await loginPage.login("test", "password123");
  await dashBoardPage.verifyLoginSuccess();
};

testLogin();
