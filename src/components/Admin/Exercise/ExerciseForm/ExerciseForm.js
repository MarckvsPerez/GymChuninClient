import React, { useCallback } from "react";
import { Form, Image, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { Exercise } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
import { initialValues, validationSchema } from "./ExerciseForm.form";
import jsonData from "assets/muscles.json";
import "./ExerciseForm.scss";

const exerciseController = new Exercise();

export function ExerciseForm(props) {
  const { onClose, onReload, exercise } = props;
  const { accessToken } = useAuth();

  const muscleGroups = Object.keys(jsonData.musculos).map((group) => ({
    key: group,
    text: group,
    value: group,
  }));

  const editorOptions = {
    height: 400,
    menubar: true,
    toolbar:
      // eslint-disable-next-line no-multi-str
      "undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | ",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  };

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
          placeholder="Grupo Muscular"
          selection
          options={muscleGroups}
          onChange={(event, { value }) => {
            formik.setFieldValue("muscleGroup", value);
            formik.setFieldValue("muscle", "");
          }}
          value={formik.values.muscleGroup}
        />

        <Form.Field
          control={Dropdown}
          name="muscle"
          placeholder="Músculo"
          selection
          options={
            formik.values.muscleGroup
              ? jsonData.musculos[formik.values.muscleGroup].map((muscle) => ({
                  key: muscle.nombre,
                  text: muscle.nombre,
                  value: muscle.nombre,
                }))
              : []
          }
          onChange={(event, { value }) => formik.setFieldValue("muscle", value)}
          value={formik.values.muscle}
          error={formik.errors.muscle ? true : false}
          disabled={!formik.values.muscleGroup}
        />
      </Form.Group>

      <Editor
        apiKey="kqouulohyugx37iuagjwuixko0dug6ht4ktgzuryyaatthcv"
        init={editorOptions}
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
