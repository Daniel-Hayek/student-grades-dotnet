// Ensuring that the DOM is fully loaded before anything else happens

document.addEventListener("DOMContentLoaded", () => {
    // Data for selectBox
    const genderData = ["Male", "Female", "Other", "Prefer not to specify"];

    // Data for tagBox
    const dayData = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    // Number Box
    $(function () {
        $("#numberBoxContainer").dxNumberBox({
            min: 0,
            max: 100,
            showSpinButtons: true,
            label: "What is your favorite number?",
            labelMode: "floating",
            width: 300,
        });
    });

    // Text Box
    $(function () {
        $("#textBoxContainer").dxTextBox({
            label: "What is your name?",
            labelMode: "floating",
            width: 300,
            showClearButton: true,
        });
    });

    // Select Box
    $(function () {
        $("#selectBoxContainer").dxSelectBox({
            dataSource: genderData,
            label: "What is your gender?",
            labelMode: "floating",
            width: 300,
        });
    });

    // Tag Box
    $(function () {
        $("#tagBoxContainer").dxTagBox({
            dataSource: dayData,
            label: "On which days do you work?",
            labelMode: "floating",
            width: 300,
            multiline: true,
            showSelectionControls: true,
        });
    });

    // Button to handle data in boxes
    $(function () {
        $("#dataEntryButton").dxButton({
            text: "Enter Data",
            onClick: (e) => {
                const num = $("#numberBoxContainer")
                    .dxNumberBox("instance")
                    .option("value");
                const text = $("#textBoxContainer")
                    .dxTextBox("instance")
                    .option("value");
                const tag = $("#tagBoxContainer").dxTagBox("instance").option("value");
                const select = $("#selectBoxContainer")
                    .dxSelectBox("instance")
                    .option("value");

                const popup = $("#dataPopup")
                    .dxPopup({
                        contentTemplate: () => {
                            const content = $("<div />");

                            content.append(
                                $("<p />").text(`Your name: ${text || "No name given"}`),
                                $("<p />").text(
                                    `Your favorite number: ${num ?? "None selected"}`,
                                ),
                                $("<p />").text(`Your gender: ${select ?? "None selected"}`),
                                $("<p />").text(
                                    `Your workdays: ${tag.length != 0 ? tag : "None selected"}`,
                                ),
                            );

                            return content;
                        },
                        hideOnOutsideClick: true,
                        width: 400,
                        height: 400,
                        resizeEnabled: true,
                        title: "Your Data",
                    })
                    .dxPopup("instance");

                popup.show();

                e.component.option("disabled", true);

                setTimeout(() => {
                    e.component.option("disabled", false);
                }, 2000);
            },
            type: "normal",
            stylingMode: "contained",
            width: "240",
            icon: "add",
        });
    });
});
