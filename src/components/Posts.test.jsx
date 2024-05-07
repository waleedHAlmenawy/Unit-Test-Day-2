import React from "react";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

import Posts from "./Posts";

const fakeData = [
  {
    userId: 1,
    id: 1,
    title: "Post 1",
    body: "Post 1",
  },
  {
    userId: 2,
    id: 2,
    title: "Post 2",
    body: "Post 2",
  },
  {
    userId: 3,
    id: 3,
    title: "Post 3",
    body: "Post 3",
  },
];

const handlers = [
  http.get("*/posts", () => {
    return HttpResponse.json(fakeData);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("<CoinGame/>", () => {
  test("render intial loading in the ui", async () => {
    render(<Posts />);

    expect(screen.getByText("Loading!!!")).toBeInTheDocument();
  });

  test("fetched shown in the ui", async () => {
    render(<Posts />);

    await new Promise((res) => {
      setTimeout(() => {
        res(undefined);
      }, 0);
    });

    expect(await screen.findAllByRole("listitem")).toHaveLength(3);
  });

  test("handle error", async () => {
    server.use(
      http.get("*/posts", () => {
        return HttpResponse.json([]);
      })
    );

    render(<Posts />);

    await new Promise((res) => {
      setTimeout(() => {
        res(undefined);
      }, 0);
    });

    screen.debug();

    expect(await screen.getByText("Error Occured")).toBeInTheDocument();
  });
});
