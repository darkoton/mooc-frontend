import Header from "@widgets/app/Header";
import Footer from "@widgets/app/Footer";
import LoginForm from "@widgets/auth/LoginForm";
import { withUnauth } from "@shared/hocs/withUnauth";

import s from "./Login.module.scss";

const LoginPage = withUnauth(() => {
  return (
    <div className={s.pageWrapper}>
      <Header />
      <main>
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
});

export default LoginPage;
