  /**開啟綠界付款表單頁 */
export function injectAndSubmitECPayForm(html: string) {
    document.getElementById("__ecpayFormWrapper")?.remove(); // 移除先前殘留表單
    const container = document.createElement("div");
    container.id = "__ecpayFormWrapper";
    container.innerHTML = html;
    document.body.appendChild(container);

    setTimeout(() => {
      const form = document.getElementById("_form_aiochk");
      if (form instanceof HTMLFormElement) {
        form.submit();
      } else {
        console.error("ECPay 表單無法正確載入。");
      }
    }, 10);
  }