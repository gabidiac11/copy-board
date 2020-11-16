window.copyData = [
  {
    title: "Workspace 1",
    rows: [
      {
        type: "break",
      },
      {
        type: "h",
        content: "Dev paths ",
      },
      {
        type: "text",
        content: "\\exemple\\exemple\\etc ",
      },
      {
        type: "text",
        content: "\\exemple\\exemple\\etc ",
      },
      {
        type: "text",
        content:
          "\\\\exemple\\exemple\\",
      },
      {
        type: "text",
        content:
          "\\\\exemple\\exemple\\",
      },
      {
        type: "text",
        content:
          "\\\\exemple\\exemple\\",
      },
      {
        type: "text",
        content:
          "\\\\exemple\\exemple\\",
      },
      {
        type: "text",
        content: "\\exemple\\exemple\\etc ",
      },
      {
        type: "break",
      },
      {
        type: "h",
        content: "Server ",
      },
      {
        type: "text",
        content: "username ",
      },
      {
        type: "password",
        content: "my password ",
      },
      
      {
        type: "h",
        caution: true,
        content: "Important header ",
      },
      {
        type: "text",
        content: "something important ",
      }
    ],
  },
  {
    title: "Workspace 2",
    rows: [
      {
        type: "break",
      },
      {
        type: "h",
        content: "Dev paths ws 2",
      },
      {
        type: "text",
        content: "\\exemple\\exemple\\etc ws 2",
      },
      {
        type: "text",
        content: "\\exemple\\exemple\\etc ws 2",
      },
      {
        type: "text",
        content:
          "\\\\exemple\\exemple\\",
      },
      {
        type: "text",
        content:
          "\\\\exemple\\exemple\\",
      },
      {
        type: "text",
        content:
          "\\\\exemple\\exemple\\",
      },
      {
        type: "text",
        content:
          "\\\\exemple\\exemple\\",
      },
      {
        type: "text",
        content: "\\exemple\\exemple\\etc ws 2",
      },
      {
        type: "break",
      },
      {
        type: "h",
        content: "Server ws 2",
      },
      {
        type: "text",
        content: "username ws 2",
      },
      {
        type: "password",
        content: "my password ws 2",
      },
      
      {
        type: "h",
        caution: true,
        content: "Important header ws 2",
      },
      {
        type: "text",
        content: "something important ws 2",
      }
    ],
  },
];

window.copyData = window.copyData.map(item => {
    return {
        ...item,
        count: item.rows.filter(_item => _item.type === "text" || _item.type === "password").length
    }
})