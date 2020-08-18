import React from "react";
import {render, screen, fireEvent, getByTestId} from "@testing-library/react";
import LightBulb from "./state";

test("Bulb is on", () => {
    const {container} = render(<LightBulb/>)

    const onButton = screen.getByPlaceholderText("On");

    const offButton = screen.getByPlaceholderText("Off");

    expect(onButton).toBeInTheDocument()

    expect(offButton).toBeInTheDocument();


});