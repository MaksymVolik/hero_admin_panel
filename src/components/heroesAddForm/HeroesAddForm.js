import { useSelector } from "react-redux";
// import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useCreateHeroMutation } from "../api/heroesApi";
import { selectAll } from "../heroesFilters/fitersSlice";

const HeroesAddForm = () => {
  const filters = useSelector(selectAll);
  const filtersLoadingStatus = useSelector(
    (state) => state.filters.filtersLoadingStatus
  );
  const [createHero] = useCreateHeroMutation();

  const heroAdd = (values) => {
    const hero = {
      // id: uuidv4(),
      ...values,
    };
    createHero(hero);
  };

  const renderFilters = (process, elements) => {
    if (process === "loading") {
      return <option>Loading...</option>;
    } else if (process === "error") {
      return <option>Loading error</option>;
    }

    if (elements.length === 0) {
      return <option>Element list is empty</option>;
    }

    const items = elements
      .filter((item) => item.name !== "all")
      .map(({ name, title }) => {
        return (
          <option key={name} value={name}>
            {title}
          </option>
        );
      });
    return (
      <>
        <option>I own the element...</option>
        {items}
      </>
    );
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        element: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Minimum length of 2 characters!")
          .required("Required field!"),
        description: Yup.string()
          .min(5, "The number must be at least 5")
          .required("Required field"),
        element: Yup.string().required("You need to choose an element!"),
      })}
      // onSubmit={values => console.log(JSON.stringify(values, null, 2))}
      onSubmit={(values, { resetForm }) => {
        heroAdd(values);
        resetForm();
      }}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            New hero's name
          </label>
          <Field
            id="name"
            name="name"
            type="text"
            className="form-control"
            placeholder="What is my name?"
            autoComplete="on"
          />
          <ErrorMessage className="error" name="name" component="div" />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fs-4">
            Description
          </label>
          <Field
            id="description"
            name="description"
            as="textarea"
            className="form-control"
            placeholder="What can I do?"
            style={{ height: "130px" }}
          />
          <ErrorMessage className="error" name="description" component="div" />
        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Select hero element
          </label>
          <Field
            as="select"
            className="form-select"
            id="element"
            name="element"
          >
            {renderFilters(filtersLoadingStatus, filters)}
          </Field>
          <ErrorMessage className="error" name="element" component="div" />
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </Form>
    </Formik>
  );
};

export default HeroesAddForm;
