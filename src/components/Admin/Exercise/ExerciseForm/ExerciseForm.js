import React, { useCallback } from "react";
import { Form, Image, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { Exercise } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
import { initialValues, validationSchema } from "./ExerciseForm.form";
import "./ExerciseForm.scss";

const exerciseController = new Exercise();

export function ExerciseForm(props) {
  const { onClose, onReload, exercise } = props;
  const { accessToken } = useAuth();

  const muscles = [
    { key: "hombro", text: "Hombro", value: "Hombro" },
    { key: "pecho", text: "Pecho", value: "Pecho" },
    // Agrega más opciones de músculos según sea necesario
  ];

  const formik = useFormik({
    initialValues: initialValues(exercise),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (exercise) {
          await exerciseController.updateExercise(
            accessToken,
            exercise._id,
            formValue
          );
        } else {
          await exerciseController.createExercise(accessToken, formValue);
        }

        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    formik.setFieldValue("miniature", URL.createObjectURL(file));
    formik.setFieldValue("file", file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
  });

  const getMiniature = () => {
    if (formik.values.file) {
      return formik.values.miniature;
    } else if (formik.values.miniature) {
      return `${ENV.BASE_PATH}/${formik.values.miniature}`;
    }
    return null;
  };

  return (
    <Form className="post-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="title"
          placeholder="Titulo del ejercicio"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <Form.Input
          name="path"
          placeholder="Path del ejercicio"
          onChange={formik.handleChange}
          value={formik.values.path}
          error={formik.errors.path}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field
          control={Dropdown}
          name="muscle"
          placeholder="Musculo"
          selection
          options={muscles}
          onChange={(event, { value }) => formik.setFieldValue("muscle", value)}
          value={formik.values.muscle}
          error={formik.errors.muscle ? true : false}
        />
      </Form.Group>

      <Editor
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
        initialValue={formik.values.content}
        onBlur={(e) => formik.setFieldValue("content", e.target.getContent())}
      />

      <div className="post-form__miniature" {...getRootProps()}>
        <input {...getInputProps()} />
        {getMiniature() ? (
          <Image size="small" src={getMiniature()} />
        ) : (
          <div>
            <span>Arrastra tu imagen</span>
          </div>
        )}
      </div>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {exercise ? "Actualizar ejercicio" : "Crear ejercicio"}
      </Form.Button>
    </Form>
  );
}
