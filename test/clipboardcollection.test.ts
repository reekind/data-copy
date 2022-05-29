import {ClipboardCollection} from "../out/ClipboardCollection";

test('create new', () => {
    const clipboards = new ClipboardCollection();
    const clipboard = clipboards.new();
    expect(clipboard).not.toBeNull();
});

test('not existing gives error', () => {
  const clipboards = new ClipboardCollection();
  const clipboard = clipboards.get("TESTID");
  expect(clipboard).toBeFalsy();
});

test('changing works',  () => {
  const clipboards = new ClipboardCollection();
  const clipboard = clipboards.new();
  const text = "1234TEST$%&/(/&%$§$%&/";

  clipboards.update(clipboard.id, text);
  const updatedClipboard = clipboards.get(clipboard.id);
  expect(updatedClipboard.text).toBe(text);
});

test('changing not existing fails',  () => {
  const clipboards = new ClipboardCollection();
  const text = "1234TEST$%&/(/&%$§$%&/";
  expect(clipboards.update("NOTEXISTING", text)).toThrowError();
});