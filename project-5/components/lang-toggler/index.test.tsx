import { render, screen } from "common/utils/test-utils";
import LangToggler from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      locale: "en",
    };
  },
}));

describe("Language Toggler Component", () => {
  it('"english" language should be checked by default', () => {
    render(<LangToggler />);
    const inputRadioEng = screen.getByRole("radio-en");
    expect(inputRadioEng).toBeChecked();
  });

  it('"german" should be checked once selected', () => {
    // * arrange
    // * act
    // * assert
  });
});
