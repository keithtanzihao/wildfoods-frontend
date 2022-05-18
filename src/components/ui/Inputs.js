import React, { Fragment } from "react";

import styles from "../../styles/main.module.scss";

const textTypes = ["title", "password", "energy"];
const textAreaTypes = ["description", "warning"];
const numberTypes = ["id", "category_id", "product_id", "recipie_id", "price", "weight", "fat", "saturated_fat",
  "carbohydrates", "sugars", "fiber", "protein", "sodium", "percentage", "time_taken",
  "difficulty", "index", "quantity"];
const foreignKeyType = ["productIngredient"];
const hexColorType = ["color_theme"];
const emailType = ["email"];
const urlType = ["media_url"];


const validateTextInput = (key, value, errorMsg, setErrorMsg) => {
  let msg = "Valid"
  const colorRegex = /^#[0-9A-F]{6}$/i;
  const urlRegex = /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (textTypes.includes(key)) {
    if (value.length === 0) msg = `${key} cannot be empty`;
    else if (value.length < 8) msg = `${key} must at least be 8 characters`;
    else if (value.length > 50) msg = `${key} cannot exceed 50 characters`;
  }
  else if (textAreaTypes.includes(key)) {
    if (value.length === 0) msg = `${key} cannot be empty`;
    if (value.length > 300) msg = `${key} cannot exceed 300 characters`;
  }
  else if (hexColorType.includes(key)) {
    if (!value.match(colorRegex)) msg = "Invalid hex color code";
  }
  else if (numberTypes.includes(key)) {
    let isNumber = parseFloat(value);
    if (isNaN(isNumber)) msg = "Input must be a number";
    if (key === "percentage") {
      if (value > 100) msg = `${key} cannot exceed 100%`;
      if (value < 0) msg = `${key} cannot be lower than 0%`;
    }
  }
  else if (foreignKeyType.includes(key)) {
    if (value.length === 0) msg = `Must select at least one field`
  }
  else if (urlType.includes(key)) {
    if (!value.match(urlRegex)) msg = "Invalid url";
  }
  else if (emailType.includes(key)) {
    if (!value.match(emailRegex)) msg = "Invalid email";
  }

  setErrorMsg({
    ...errorMsg,
    [key]: msg
  });
}



function TextNumberInput(props) {
  // Update sate function
  const updateTextInputTag = (event) => {
    validateTextInput(event.target.name, event.target.value, props.errorMsg, props.setErrorMsg);

    let inputValue =
      !isNaN(event.target.value) && numberTypes.includes(event.target.name)
        ? parseFloat(event.target.value)
        : event.target.value;

    props.setTableData({
      ...props.tableData,
      [event.target.name]: inputValue
    });
  };
  return (
    <div className={`${styles["input__ctn"]}`}>
      <label>{props.name}</label>
      <div>
        <input
          className={props.errorMsg[props.name] === "Valid" || props.errorMsg[props.name] === ""
            ? `${styles["input__div--valid"]}`
            : `${styles["input__div--invalid"]}`}
          type={props.type}
          name={props.name}
          value={props.tableData[props.name]}
          onChange={updateTextInputTag}
        />
        <span
          className={
            props.errorMsg[props.name] === "Valid"
              ? `${styles["input__span--valid"]}`
              : `${styles["input__span--invalid"]}`
          }
        >
          {props.errorMsg[props.name]}
        </span>
      </div>
    </div>
  )
}




function TextAreaInput(props) {
  // Update sate function
  const updateTextInputTag = (event) => {
    validateTextInput(event.target.name, event.target.value, props.errorMsg, props.setErrorMsg);
    props.setTableData({
      ...props.tableData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className={`${styles["input__ctn"]}`}>
      <label>{props.name}</label>
      <div>
        <textarea
          cols="50"
          rows="5"
          className={props.errorMsg[props.name] === "Valid" || props.errorMsg[props.name] === ""
            ? `${styles["input__div--valid"]}`
            : `${styles["input__div--invalid"]}`}
          name={props.name}
          value={props.tableData[props.name]}
          onChange={updateTextInputTag}
        />
        <span
          className={
            props.errorMsg[props.name] === "Valid"
              ? `${styles["input__span--valid"]}`
              : `${styles["input__span--invalid"]}`
          }
        >
          {props.errorMsg[props.name]}
        </span>
      </div>
    </div>
  )
}












function TextInputValidate(props) {
  // Update sate function
  const updateTextInputTag = (event) => {
    validateTextInput(event.target.name, event.target.value, props.errorMsg, props.setErrorMsg);

    let inputValue =
      !isNaN(event.target.value) && numberTypes.includes(event.target.name)
        ? parseFloat(event.target.value)
        : event.target.value;

    props.setTableData({
      ...props.tableData,
      [event.target.name]: inputValue
    });
  };
  return (
    <div className={ props.className ? props.className : `${styles["input__ctn"]}`}>
      <label>{props.name.toUpperCase()}</label>
      <div>
        <input
          className={props.errorMsg[props.name] === "Valid" || props.errorMsg[props.name] === ""
            ? `${styles["input__div--valid"]}`
            : `${styles["input__div--invalid"]}`}
          type={props.type}
          name={props.name}
          value={props.tableData[props.name]}
          onChange={updateTextInputTag}
        />
        <span
          className={
            props.errorMsg[props.name] === "Valid"
              ? `${styles["input__span--valid"]}`
              : `${styles["input__span--invalid"]}`
          }
        >
          {props.errorMsg[props.name]}
        </span>
      </div>
    </div>
  )
}


function TextInput(props) {
  const updateTextInputTag = (event) => {
    props.setTableData({
      ...props.tableData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <label>
      <input
        type="text"
        name={props.name}
        value={props.tableData[props.name]}
        onChange={updateTextInputTag}
        placeholder="Search Product"
      />
    </label>
  )
}

function RadioInput(props) {
  const updateTextInputTag = (event) => {
    props.setTableData({
      ...props.tableData,
      [event.target.name]: parseFloat(event.target.value)
    });
  };

  const renderRadioButtons = () => {
    return props.radioList.map((item, index) => {
      return (
        <label key={item.title}>
          <input
            type="radio"
            name={props.name}
            value={item.id}
            onChange={updateTextInputTag}
            checked={props.tableData[props.name] === item.id}
          />
          <span>{item.title}</span>
        </label>
      )
    })
  }

  return (
    <div className={`${styles["radioInput__ctn"]}`}>
      {renderRadioButtons()}
    </div>
  )
}

function SelectOptionInput(props) {

  // Update sate function
  const updateTextInputTag = (event) => {
    props.setTableData({
      ...props.tableData,
      [event.target.name]: event.target.value
    });
  };

  const renderOptions = () => {
    return props.optionList.map((item) => {
      return (
        <Fragment key={item}>
          <option value={item}>{item}</option>
        </Fragment>
      )
    })
  }

  return (
    <select
      name={props.name}
      value={props.tableData[props.name]}
      onChange={updateTextInputTag}
    >
      {renderOptions()}
    </select>

  )
}



















function RadioInputValidate(props) {

  // Update sate function
  const updateTextInputTag = (event) => {
    validateTextInput(event.target.name, event.target.value, props.errorMsg, props.setErrorMsg);
    props.setTableData({
      ...props.tableData,
      [event.target.name]: numberTypes.includes(event.target.name) ? parseFloat(event.target.value) : event.target.value
    });
  };

  const renderRadioButtons = () => {
    return props.radioList.map((item, index) => {
      return (
        <Fragment key={item}>
          <input
            className={props.errorMsg[props.name] === "Valid" || props.errorMsg[props.name] === ""
              ? `${styles["input__div--valid"]}`
              : `${styles["input__div--invalid"]}`}
            type="radio"
            name={props.name}
            value={item}
            onChange={updateTextInputTag}
            checked={props.tableData[props.name] === item}
          />
          <span>{item}</span>
        </Fragment>
      )
    })
  }

  return (
    <div className={`${styles["input__ctn"]}`}>
      <label>{props.name}</label>
      <div>
        {renderRadioButtons()}
        <span
          className={
            props.errorMsg[props.name] === "Valid"
              ? `${styles["input__span--valid"]}`
              : `${styles["input__span--invalid"]}`
          }
        >
          {props.errorMsg[props.name]}
        </span>
      </div>
    </div>
  )
}


















function SelectInput(props) {

  // Update sate function
  const updateTextInputTag = (event) => {
    validateTextInput(event.target.name, event.target.value, props.errorMsg, props.setErrorMsg);

    let inputValue =
      !isNaN(event.target.value) && numberTypes.includes(event.target.name)
        ? parseFloat(event.target.value)
        : event.target.value;

    console.log(inputValue);

    props.setTableData({
      ...props.tableData,
      [event.target.name]: inputValue
    });
  };

  const renderOptions = () => {
    return props.optionList.map((item) => {
      return (
        <Fragment key={item.title}>
          <option value={item.id}>{item.title}</option>
        </Fragment>
      )
    })
  }

  return (
    <div className={`${styles["input__ctn"]}`}>
      <label>{props.name}</label>
      <div>
        <select
          className={props.errorMsg[props.name] === "Valid" || props.errorMsg[props.name] === ""
            ? `${styles["input__div--valid"]}`
            : `${styles["input__div--invalid"]}`}
          name={props.name}
          value={props.tableData[props.name]}
          onChange={updateTextInputTag}
        >
          {renderOptions()}
        </select>
        <span
          className={
            props.errorMsg[props.name] === "Valid"
              ? `${styles["input__span--valid"]}`
              : `${styles["input__span--invalid"]}`
          }
        >
          {props.errorMsg[props.name]}
        </span>
      </div>
    </div>
  )
}


function SelectMultipleInput(props) {

  // Update sate function
  const updateTextInputTag = (event) => {
    let optionList = Array.from(event.target.selectedOptions, option => parseFloat(option.value));
    validateTextInput(event.target.name, optionList, props.errorMsg, props.setErrorMsg);

    props.setTableData({
      ...props.tableData,
      [event.target.name]: optionList
    });
  };

  const renderOptions = () => {
    return props.optionList.map((item) => {
      return (
        <Fragment key={item.title}>
          <option value={item.id}>{item.title}</option>
        </Fragment>
      )
    })
  }

  return (
    <div className={`${styles["input__ctn"]}`}>
      <label>{props.name}</label>
      <div>
        <select
          className={props.errorMsg[props.name] === "Valid" || props.errorMsg[props.name] === ""
            ? `${styles["input__div--valid"]}`
            : `${styles["input__div--invalid"]}`}
          name={props.name}
          value={props.tableData[props.name]}
          onChange={updateTextInputTag}
          multiple
        >
          {renderOptions()}
        </select>
        <span
          className={
            props.errorMsg[props.name] === "Valid"
              ? `${styles["input__span--valid"]}`
              : `${styles["input__span--invalid"]}`
          }
        >
          {props.errorMsg[props.name]}
        </span>
      </div>
    </div>
  )
}


export {
  TextNumberInput,
  TextAreaInput,

  SelectInput,
  SelectMultipleInput,


  RadioInput,
  TextInput,
  SelectOptionInput,

  TextInputValidate
}