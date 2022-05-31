import {ClipboardCollection} from "../out/ClipboardCollection";

const clipboards: ClipboardCollection = ClipboardCollection.init();

test('create new', () => {
    const clipboard = clipboards.new();
    expect(clipboard).not.toBeNull();
});

test('not existing gives error', () => {
  const clipboard = clipboards.get("TESTID");
  expect(clipboard).toBeFalsy();
});

test('changing works',  () => {
  const clipboard = clipboards.new();
  const text = "1234TEST$%&/(/&%$§$%&/";

  clipboards.update(clipboard.id, text);
  const updatedClipboard = clipboards.get(clipboard.id);
  expect(updatedClipboard.text).toBe(text);
});

test('changing not existing fails',  () => {
  const text = "1234TEST$%&/(/&%$§$%&/";
  expect(clipboards.update("NOTEXISTING", text)).toThrowError();
});