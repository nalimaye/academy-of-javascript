import React from 'react';

const CampusForm = props => {
  return (
    <form id="form" onSubmit={props.handleSubmit}>
      <p>
        <label htmlFor="name">
          Name :{' '}
          <span className="warning" hidden={props.name}>
            *
          </span>
        </label>
        <input
          name="name"
          type="text"
          value={props.name}
          onChange={props.handleChange}
        />
      </p>
      <p>
        <label htmlFor="address">
          Address :{' '}
          <span className="warning" hidden={props.address}>
            *
          </span>
        </label>
        <input
          name="address"
          type="text"
          value={props.address}
          onChange={props.handleChange}
        />
      </p>
      <p>
        <label htmlFor="description">Description : </label>
        <textarea
          name="description"
          rows="4"
          cols="60"
          value={props.description}
          onChange={props.handleChange}
        />
      </p>
      <p>
        <span className="warning" hidden={props.name && props.address}>
          * Field is required !
        </span>
      </p>
      <p>
        <button
          id="submit"
          type="submit"
          name="addCampus"
          onClick={props.handleSubmit}
          disabled={!props.name || !props.address}
        >
          {props.buttonName}
        </button>
      </p>
    </form>
  );
};

export default CampusForm;
