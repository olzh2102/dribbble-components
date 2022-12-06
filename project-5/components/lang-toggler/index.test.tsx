import { Lang } from "common/types";
import { render, screen, fireEvent } from "common/utils/test-utils";
import { useRouter as mockedUseRouter } from "next/router";
import LangToggler from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: () => {},
  })),
}));

describe("Language Toggler Component", () => {
  it('"english" language should be checked by default', () => {
    render(<LangToggler lang="en" />);
    expect(screen.getByRole("radio-en")).toHaveClass("checked");
    expect(screen.getByRole("radio-de")).not.toHaveClass("checked");
    expect(screen.getByRole("radio-ru")).not.toHaveClass("checked");
  });

  it('"german" should be checked once selected', async () => {
    const push = jest.fn();
    (mockedUseRouter as any).mockImplementation(() => ({ push, route: "/de" }));
    const { rerender } = render(<LangToggler lang="en" />);

    screen.getByRole("radio-de");

    fireEvent.click(screen.getByLabelText("de"));
    expect(push).toHaveBeenCalledWith("/de", undefined, {
      locale: "de",
    });

    rerender(<LangToggler lang="de" />);

    expect(screen.getByRole("radio-de")).toHaveClass("checked");
    expect(screen.getByRole("radio-en")).not.toHaveClass("checked");
    expect(screen.getByRole("radio-ru")).not.toHaveClass("checked");
  });
});
