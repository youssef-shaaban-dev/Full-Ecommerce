import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTranslations } from "next-intl";

const AccountBody = () => {
  const t = useTranslations("user.edit_profile");

  const initialValues = {
    FirstName: "",
    LastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  function submit() {
    console.log("submitted");
  }
  return (
    <div className="bg-slate-50 shadow-md shadow-slate-200 py-8 px-20 rounded-sm custom-phone:px-5">
      <h3 className="text-red-600 mb-5">{t("title")}</h3>
      <Formik initialValues={initialValues} onSubmit={submit}>
        <Form className="flex flex-col gap-10">
          <div className="flex justify-between gap-2 custom-phone:flex-col">
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">{t("first_name")}</label>
              <Field
                type="text"
                name="name"
                className="w-[300px] p-3 border rounded bg-slate-200 tab-large-screen:w-[200px] custom-mid:p-2 custom-mid:w-[120px] custom-phone:!w-max"
                placeholder={t("first_name")}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">{t("last_name")}</label>
              <Field
                type="text"
                name="lastName"
                className="w-[300px] p-3 border rounded bg-slate-200 tab-large-screen:w-[200px] custom-mid:p-2 custom-mid:w-[120px] custom-phone:!w-max"
                placeholder={t("last_name")}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <div className="flex justify-between gap-2 custom-phone:flex-col">
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">{t("email")}</label>
              <Field
                type="email"
                name="email"
                className="w-[300px] p-3 border rounded bg-slate-200 tab-large-screen:w-[200px] custom-mid:p-2 custom-mid:w-[120px] custom-phone:!w-max"
                placeholder={t("email")}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">{t("address")}</label>
              <Field
                type="text"
                name="Address"
                className="w-[300px] p-3 border rounded bg-slate-200 tab-large-screen:w-[200px] custom-mid:p-2 custom-mid:w-[120px] custom-phone:!w-max"
                placeholder={t("address")}
              />
              <ErrorMessage
                name="Address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="w-[100%] flex flex-col gap-2">
              <label className="text-gray-700">{t("password_changes")}</label>
              <Field
                type="password"
                name="currentPassword"
                className="w-[100%] p-3 border rounded bg-slate-200"
                placeholder={t("current_pass")}
              />
              <Field
                type="password"
                name="newPassword"
                className="w-[100%] p-3 border rounded bg-slate-200"
                placeholder={t("new_pass")}
              />
              <Field
                type="password"
                name="confirmPassword"
                className="w-[100%] p-3 border rounded bg-slate-200"
                placeholder={t("confirm_pass")}
              />
            </div>
          </div>
          <div className="flex flex-row-reverse gap-3 ">
            <Button className="px-10 py-3 text-xs font-thin">
              {t("save")}
            </Button>
            <button className="border-0 ">
              {t("cancel")}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};


export default AccountBody;
