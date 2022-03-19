
//start factor inventarisation

const loadCurrentFactorInventarisation = () => {
    let currentExperience = getCurrentExperience();

    if (currentExperience.type == "skilled_and_succeeded") {
        setOptionsVariation(true);
    } else {
        setOptionsVariation(false);
    }

    $('#experience-description').text(currentExperience.description);
    $('#experience-action').text(currentExperience.action);
    $('#experience-thought').text(currentExperience.thought);

    if (emotionIsCustom(currentExperience.feeling)) {
        $('#experience-feeling').text(currentExperience.feeling);
    } else {
        const emotionText = getEmotionText(currentExperience.feeling);
        $('#experience-feeling').text(emotionText);
    }

    if (currentExperience.ending) {
        $("#experience-ending").removeClass("hidden").text(currentExperience.ending);
        $("#experience-ending-caption").removeClass("hidden");
    } else {
        $("#experience-ending").addClass("hidden");
        $("#experience-ending-caption").addClass("hidden");
    }

    if (currentExperience.factor) {
        $('#factor-type').val(currentExperience.factor.type);
        $('#factor-description').val(currentExperience.factor.description);
    } else {
        $('#factor-type').prop('selectedIndex',-1);
        $('#factor-description').val("");
    }

    $("#experience-index").text(getCurrentExperienceIndex() + 1);
    $("#experience-count").text(getExperienceCount());
}

const setOptionsVariation = (positive = true) => {
    if (positive) {
        $("option[value=mirror]").html('Ik wist dat iemand anders het gelukt was.');
        $("option[value=imagination]").html('Ik zag voor me hoe het zou lukken.');
        $("option[value=physical]").html('Ik was helemaal fit.');
        $("option[value=mental]").html('Ik was niet druk in mijn hoofd.');
    } else {
        $("option[value=mirror]").html('Ik wist dat iemand anders het ook niet gelukt was.');
        $("option[value=imagination]").html('Ik zag voor me hoe het zou mislukken.');
        $("option[value=physical]").html('Ik was niet helemaal fit.');
        $("option[value=mental]").html('Ik was al druk in mijn hoofd.');
    }
}

//save factor

const saveFactorInventarisation = () => {
    const factor = {
        type: $("#factor-type").val(),
        description: $("#factor-description").val()
    };

    if (factor.type) {
        setExperience(undefined, undefined, undefined, undefined, factor, undefined);
        return true;
    } else return false;
}