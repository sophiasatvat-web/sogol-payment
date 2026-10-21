const cardNumbers = {
  copyMehrButton: "6063731158110446",
  copyBlueButton: "6219861840989999"
};

async function copyNumber(buttonId, textId, cardNumber, bankName) {
  const button = document.getElementById(buttonId);
  const label = document.getElementById(textId);
  const feedback = document.getElementById("copyFeedback");
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(cardNumber);
    } else {
      const helper = document.createElement("textarea");
      helper.value = cardNumber;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.select();
      const successful = document.execCommand("copy");
      helper.remove();
      if (!successful) throw new Error("Copy command failed");
    }
    label.textContent = "شماره کارت کپی شد";
    feedback.textContent = `شماره کارت ${bankName} کپی شد.`;
    button.setAttribute("aria-label", `شماره کارت ${bankName} کپی شد`);
  } catch (error) {
    feedback.textContent = `کپی خودکار انجام نشد؛ شماره کارت ${bankName}: ${cardNumber}`;
    label.textContent = "کپی انجام نشد";
  }
  window.setTimeout(() => {
    label.textContent = `کپی شماره کارت ${bankName}`;
    button.setAttribute("aria-label", `کپی شماره کارت ${bankName}`);
  }, 2800);
}

document.getElementById("copyMehrButton").addEventListener("click", () =>
  copyNumber("copyMehrButton", "copyMehrText", cardNumbers.copyMehrButton, "بانک مهر")
);
document.getElementById("copyBlueButton").addEventListener("click", () =>
  copyNumber("copyBlueButton", "copyBlueText", cardNumbers.copyBlueButton, "بانک بلو")
);
