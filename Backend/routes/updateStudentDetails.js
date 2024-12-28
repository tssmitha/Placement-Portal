const Form = require('../Models/releaseFormSchema');

async function fixExistingForms() {
    const forms = await Form.find({});
    for (let form of forms) {
        if (!Array.isArray(form.studentDetails)) {
            form.studentDetails = [form.studentDetails]; // Convert to an array
            await form.save();
            console.log(`Updated form with ID: ${form._id}`);
        }
    }
}

fixExistingForms();
