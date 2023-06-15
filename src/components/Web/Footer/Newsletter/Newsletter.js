import React, { useState } from "react";
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { Newsletter as NewsletterController } from "../../../../api";
import { initialValues, validationSchema } from "./Newsletter.form";
import "./Newsletter.scss";

const newsletterController = new NewsletterController();

export function Newsletter() {
  const [successs, setSuccesss] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setSuccesss(false);

      try {
        await newsletterController.registerEmail(formValue.email);
        formik.resetForm();
        setSuccesss(true);

        setTimeout(() => {
          setSuccesss(false);
        }, 2000); // 2 segundos de retraso
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="footer-newsletter">
      <Form size="mini" onSubmit={formik.handleSubmit}>
        <Form.Input
          label="¡Quiero estar al día!"
          name="email"
          placeholder="Correo electronico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />

        <Form.Button fluid loading={formik.isSubmitting}>
          {!successs ? "¡Me suscribo!" : <Icon name="check" />}
        </Form.Button>
      </Form>
    </div>
  );
}
