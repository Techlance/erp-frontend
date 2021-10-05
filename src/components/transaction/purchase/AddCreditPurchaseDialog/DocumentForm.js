import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";

import { Formik } from "formik";
import * as yup from "yup";
import Thumb from "./Thumb";
import { render } from "react-dom";

// project imports
import { gridSpacing } from "../../../../store/constant";

// material-ui
import { TextField } from "@material-ui/core";
// import { DropzoneArea } from "material-ui-dropzone";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Dropzone from "react-dropzone";

// project imports
import useAuth from "../../../../hooks/useAuth";

const DocumentForm = ({ handleNext, setErrorIndex, values, setValues }) => {
  const { user } = useAuth();

  useEffect(() => {
    setValues({
      ...values,
      created_by: user.email,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  const useStyles = makeStyles((theme) =>
    createStyles({
      previewChip: {
        minWidth: 160,
        maxWidth: 210,
      },
    })
  );

  const classes = useStyles();

  const dropzoneStyle = {
    width: "100%",
    height: "auto",
    borderWidth: 2,
    borderColor: "rgb(102, 102, 102)",
    borderStyle: "solid",
    borderRadius: 10,
  };

  // const setInitialValues = () => ({
  //   files: [],
  // });

  // const [values1, setValues1] = useState(setInitialValues);
  // const handleSubmit = (values) => {
  //   console.log(
  //     JSON.stringify(
  //       {
  //         files: values.files.map((file) => ({
  //           fileName: file.name,
  //           type: file.type,
  //           size: `${file.size} bytes`,
  //         })),
  //       },
  //       null,
  //       2
  //     )
  //   );
  // };

  return (
    <>
      {/* <DropzoneArea
        showPreviews={true}
        showPreviewsInDropzone={false}
        useChipsForPreview
        previewGridProps={{ container: { spacing: 1, direction: "row" } }}
        previewChipProps={{ classes: { root: classes.previewChip } }}
        previewText="Selected files"
      /> */}

      {/* <Dropzone
        style={dropzoneStyle}
        onDrop={(acceptedFiles) => {
          if (acceptedFiles.length === 0) {
            return;
          } else {
            values1.files.concat(acceptedFiles);
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone> */}

      <Formik
        initialValues={{
          files: [],
        }}
        onSubmit={(values1) => {
          alert(
            JSON.stringify(
              {
                files: values1.files.map((file) => ({
                  fileName: file.name,
                  type: file.type,
                  size: `${file.size} bytes`,
                })),
              },
              null,
              2
            )
          );
        }}
        validationSchema={yup.object().shape({
          recaptcha: yup.array(),
        })}
      >
        {({ values1, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Multiple files</label>
              <Dropzone
                style={dropzoneStyle}
                onDrop={(acceptedFiles) => {
                  // do nothing if no files
                  if (acceptedFiles.length === 0) {
                    return;
                  }

                  // on drop we add to the existing files
                  setFieldValue("files", values1.files.concat(acceptedFiles));
                }}
              >
                {({
                  isDragActive,
                  isDragReject,
                  acceptedFiles,
                  rejectedFiles,
                }) => {
                  if (isDragActive) {
                    return "This file is authorized";
                  }

                  if (isDragReject) {
                    return "This file is not authorized";
                  }

                  if (values1.files.length === 0) {
                    return <p>Try dragging a file here!</p>;
                  }

                  return values1.files.map((file, i) => (
                    <Thumb key={i} file={file} />
                  ));
                }}
              </Dropzone>
            </div>
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default DocumentForm;
