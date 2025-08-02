import Header from "@widgets/app/Header";
import Footer from "@widgets/app/Footer";
import SignupForm from "@widgets/auth/SignupForm";
import { withUnauth } from "@shared/hocs/withUnauth";

import s from "./Signup.module.scss";

const SignupPage = withUnauth(() => {
  return (
    <div className={s.pageWrapper}>
      <Header />
      <main>
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
});

export default SignupPage;
