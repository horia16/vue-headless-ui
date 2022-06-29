import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { HDialog, HDialogContent, HDialogTitle, HDialogDescription } from "../";

const dialog = defineComponent({
  components: {
    HDialog,
    HDialogContent,
    HDialogTitle,
    HDialogDescription
  },
  props: {
    openByDefault: { type: Boolean, default: false }
  },
  setup(props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const open = ref(props.openByDefault);

    return { open };
  },
  template: /*html*/ `
  <div>
    <button @click="open = true">Open</button>
  </div>
  <h-dialog id='fixed_id' v-model="open">
    <h-dialog-content>
      <button @click="open = false">close_button</button>
      <h-dialog-title html-tag="h1">dialog_title</h-dialog-title>
      <h-dialog-description html-tag="p">dialog_descriotion</h-dialog-description>
    </h-dialog-content>
  </h-dialog>
  `
});

describe("dialog", () => {
  it("should open", async () => {
    const wrapper = mount(dialog, { attachTo: "body" });
    const button = wrapper.find("button");
    await button.trigger("click");
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it("should close", async () => {
    const wrapper = mount(dialog, { props: { openByDefault: true }, attachTo: "body" });
    const button = wrapper.find("button");
    await button.trigger("click");
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it("should trap the focus", async () => {
    //
  });

  it("should have aria description and title", async () => {
    //
  });
});
