import React, { useState } from "react";
import {
  Badge,
  Breadcrumb,
  Card,
  Col,
  Form,
  InputGroup,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { Button } from "react-bootstrap";

import "./App.scss";

const popover = (
  <Popover id="popover-basic">
    <Popover.Content>Copied!</Popover.Content>
  </Popover>
);

export default function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [state, setState] = useState({
    jdocOpen: false,
    jDocText: "",
    jdocResult: ""
  });

  React.useLayoutEffect(() => {
    if (Array.isArray(window.copyData)) {
      setData(window.copyData);
      const selected =
        Number(localStorage.getItem("copy-board-selected-h")) || 0;
      if (selected >= 0 && selected < window.copyData.length) {
        setSelected(selected);
      } else {
        setSelected(0);
      }
    }
  }, []);

  const rows =
    selected >= 0 && selected < data.length ? data[selected].rows : [];

  function onSetSelectedIndex(index) {
    localStorage.setItem("copy-board-selected-h", index);
    setSelected(index);
  }
  function renderRow(row) {
    switch (row.type) {
      case "text":
        return (
          <Card.Text
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              const target = event.target;
              const buttonNode = target.querySelector("button");
              if (buttonNode) {
                buttonNode.click();
              }
            }}
          >
            <CopyToClipboard
              text={row.content}
              onCopy={() => {
                setTimeout(() => {}, 100);
              }}
            >
              <button
                onClick={(event) => {
                  event.stopPropagation();
                }}
                className="no-button"
              >
                {row.content}
              </button>
            </CopyToClipboard>
          </Card.Text>
        );
      case "h":
        return (
          <Card.Title className={row.caution ? "title-caution" : ""}>
            {row.content}
          </Card.Title>
        );
      case "break":
        return <br></br>;
      case "link":
        return (
          <Card.Text>
            <a href={row.content} target="_blank">
              {row.content}
            </a>
            <Button className="margin-left" variant="secondary">
              <CopyToClipboard
                text={row.content}
                onCopy={() => {
                  setTimeout(() => {}, 100);
                }}
              >
                <button className="no-button" style={{ color: "white" }}>
                  Copy
                </button>
              </CopyToClipboard>
            </Button>
          </Card.Text>
        );
      case "password":
        return (
          <Card.Text>
            {/* <OverlayTrigger trigger="click" placement="top" overlay={popover}> */}
            <InputGroup className="mb-2">
              <Form.Control
                type="password"
                onClick={(event) => {
                  const target = event.target;
                  const buttonNode = target.parentNode.querySelector("button");
                  if (buttonNode) {
                    buttonNode.click();
                  }
                }}
                style={{ cursor: "pointer" }}
                readOnly={true}
                value={row.content}
                placeholder="Password"
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <CopyToClipboard
                    text={row.content}
                    onCopy={() => {
                      setTimeout(() => {}, 100);
                    }}
                  >
                    <button
                      onClick={(event) => {
                        const target = event.target;
                        // setTimeout(() => {
                        //   if (target) {
                        //     target.click();
                        //   }
                        // }, 500);
                      }}
                      className="no-button"
                    >
                      Copy
                    </button>
                  </CopyToClipboard>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            {/* </OverlayTrigger> */}
          </Card.Text>
        );
    }
  }
  /**
   *
   * @param {*} subject
   */
  function convertOBjToJDocRecursive(subject, name) {
    let mainJdocString = "";
    let subObjectsJdoc = "";

    Object.entries(subject).forEach(([key, value]) => {
      if (value && typeof value === "object") {
        if(Array.isArray(value)) {
          mainJdocString = `
          ${mainJdocString}
          * @property {Array} ${key}
        `;
        } else {
          const subName = key
            .split("")
            .map((letter, index) =>
              index === 0 ? `I${letter.toUpperCase()}` : letter
            );
  
          const result = convertOBjToJDocRecursive(value, subName);
  
          subObjectsJdoc = `
              ${subObjectsJdoc}
              ${result.subObjectsJdoc}
              ${result.mainJdocString}
          `;
          mainJdocString = `
            ${mainJdocString}
            * @property {${subName}} ${key}
          `;
        }
      } else {
        mainJdocString = `
          ${mainJdocString}
          * @property {${typeof value}} ${key}
        `;
      }
    });

    /**
     * if the main object, no "name" is passed
     */
    if (!name) {
      mainJdocString = `
      /**
       * ${subObjectsJdoc}
       * 
       * @typedef {Object} I${name || "Example"}
      ${mainJdocString}
      */
      `;
    }

    return {
      subObjectsJdoc,
      mainJdocString,
    };
  }

  /**
   *
   * @param {string} json
   */
  function convertOBjToJDoc(json) {
    let subject = "";
    try {
      subject = JSON.parse(json);

    } catch (err) {
      subject = JSON.stringify(err);
    }
    if (!subject || typeof subject !== "object") {
      return "Result is not an object: " + JSON.stringify({ subject });
    }

    const jsDocResult = convertOBjToJDocRecursive(subject);

    return jsDocResult.mainJdocString;
  }

  return (
    <div className="App">
      <Card className="header-content">
        {data.map((item, index) => (
          <Button
            className="header-btn"
            variant={index === selected ? "primary" : "secondary"}
            onClick={() => onSetSelectedIndex(index)}
          >
            {item.title} <Badge variant="light">{item.count}</Badge>
            <span className="sr-only">unread messages</span>
          </Button>
        ))}
        <Button
          className="header-btn"
          variant={"outline-dark"}
          onClick={() => {
            setState({ ...state, jdocOpen: true });
          }}
        >
          JSdoc
          <span className="sr-only">unread messages</span>
        </Button>
      </Card>
      <Card className="my-content">
        {!state.jdocOpen && rows.map(renderRow)}
        {state.jdocOpen && (
          <>
            <Card.Title className={"title-caution"}>{`COPY HERE`}</Card.Title>
            <Card.Text>
              {/* <OverlayTrigger trigger="click" placement="top" overlay={popover}> */}
              <InputGroup className="mb-2">
                <Form.Control
                  type="text"
                  onClick={(event) => {
                    const target = event.target;
                    const buttonNode = target.parentNode.querySelector(
                      "button"
                    );
                    if (buttonNode) {
                      buttonNode.click();
                    }
                  }}
                  onChange={(event) => {
                    setState({
                      ...state,
                      jDocText: event.target.value,
                      jdocResult: convertOBjToJDoc(event.target.value),
                    });
                  }}
                  value={state.jDocText}
                  placeholder="Paste here"
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <CopyToClipboard
                      text={state.jdocResult}
                      onCopy={() => {
                        setTimeout(() => {}, 100);
                      }}
                    >
                      <button onClick={(event) => {}} className="no-button">
                        Copy
                      </button>
                    </CopyToClipboard>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              {/* </OverlayTrigger> */}
            </Card.Text>
          </>
        )}
      </Card>
    </div>
  );
}
