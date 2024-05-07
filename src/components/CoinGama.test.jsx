import React from "react";
import { afterAll, afterEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CoinGame from "./CoinGame";

afterEach(() => {
  cleanup();
});

describe("<CoinGame/>", () => {
  test("throw coin button is named correct", () => {
    render(<CoinGame />);

    const btn = screen.getByText("Throw the coin");

    expect(btn).toHaveTextContent("Throw the coin");
  });

  test("button is show results after clicking", async () => {
    render(<CoinGame />);

    const btn = screen.getByText("Throw the coin");

    Math.floor = vi.fn().mockImplementation(() => 0);

    await userEvent.click(btn);

    expect(screen.getByRole("cell")).toHaveTextContent("Head");
  });
});
