import { CustomAuthPage } from "@/components/common/CustomAuthPage/CustomAuthPage";
import { formDataProp } from "@/types/formData";
import { useTranslations } from "next-intl";

const SignUpPage = () => {
  const t = useTranslations("auth");

  const fieldData: formDataProp[] = [
    {
      className: "inputs",
      type: "text",
      name: "name",
      placeholder: t("fields.name"),
    },
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
    name: "",
    email: "",
    password: "",
  };

  return (
    <>
      <CustomAuthPage
        title={t("signup_title")}
        form={fieldData}
        initialValues={initialValues}
        isLogin={false}
      />
    </>
  );
};


export default SignUpPage;
