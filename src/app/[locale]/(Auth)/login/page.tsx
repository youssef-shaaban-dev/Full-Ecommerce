import { CustomAuthPage } from "@/components/common/CustomAuthPage/CustomAuthPage";
import { formDataProp } from "@/types/formData";
import { useTranslations } from "next-intl";

const LoginPage = () => {
  const t = useTranslations("auth");

  const fieldData: formDataProp[] = [
    {
      className: "inputs",
      type: "email",
      name: "email",
      placeholder: t("fields.email"),
    },
    {
      className: "inputs",
      type: "password",
      name: "password",
      placeholder: t("fields.password"),
    },
  ];

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <>
      <CustomAuthPage
        title={t("login_title")}
        form={fieldData}
        initialValues={initialValues}
        isLogin={true}
      />
    </>
  );
};


export default LoginPage;
