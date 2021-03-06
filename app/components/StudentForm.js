import React from 'react';

const StudentForm = props => {
  return (
    <form id="form" onSubmit={props.handleSubmit}>
      <p>
        <label htmlFor="firstName">
          First Name :{' '}
          <span className="warning" hidden={props.firstName}>
            *
          </span>
        </label>
        <input
          name="firstName"
          type="text"
          value={props.firstName}
          onChange={props.handleChange}
        />
      </p>
      <p>
        <label htmlFor="lastName">
          Last Name :{' '}
          <span className="warning" hidden={props.lastName}>
            *
          </span>
        </label>
        <input
          name="lastName"
          type="text"
          value={props.lastName}
          onChange={props.handleChange}
        />
      </p>
      <p>
        <label htmlFor="email">
          Email :{' '}
          <span className="warning" hidden={props.email}>
            *
          </span>
        </label>
        <input
          name="email"
          type="text"
          value={props.email}
          onChange={props.handleChange}
        />
      </p>
      <p>
        <label htmlFor="imageUrl">Image URL : </label>
        <input
          name="imageUrl"
          type="text"
          value={props.imageUrl}
          onChange={props.handleChange}
        />
      </p>
      <p>
        <label htmlFor="gpa">
          GPA :{' '}
          <span
            className="warning"
            hidden={0.0 <= props.gpa && props.gpa <= 4.0 && props.gpa !== ''}
          >
            Number between 0.0 - 4.0
          </span>
        </label>
        <input
          name="gpa"
          type="text"
          value={props.gpa}
          onChange={props.handleChange}
        />
      </p>
      <p>
        <span
          className="warning"
          hidden={props.firstName && props.lastName && props.email}
        >
          * Field is required !
        </span>
        <span className="warning">{props.errorMessage}</span>
      </p>
      <p>
        <button
          id="submit"
          type="submit"
          name="addCampus"
          onClick={props.handleSubmit}
          disabled={!props.firstName || !props.lastName || !props.email}
        >
          {props.buttonName}
        </button>
      </p>
    </form>
  );
};

export default StudentForm;
