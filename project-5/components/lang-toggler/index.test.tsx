import { render } from "common/utils/test-utils";
import LangToggler from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      locale: "en",
    };
  },
}));

describe("Language Toggler Component", () => {
  it.skip('"english" language should be checked by default', () => {
    render(<LangToggler />);
  });

  it.skip('"german" should be checked once selected', () => {
    render(<LangToggler />);
  });
});
