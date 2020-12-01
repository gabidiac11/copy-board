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
      </Card>
      <Card className="my-content">{rows.map(renderRow)}</Card>
    </div>
  );
}
