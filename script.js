const members = [];
const records = [];

// Muestra la sección seleccionada y oculta las demás
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Función para agregar un miembro al grupo
function addMember() {
    const name = document.getElementById('memberName').value.trim();
    const surname = document.getElementById('memberSurname').value.trim();
    const rate = parseFloat(document.getElementById('memberRate').value);

    if (name && surname && rate > 0) {
        const existingMember = members.find(m => m.name === name && m.surname === surname);
        if (!existingMember) {
            const member = { id: members.length + 1, name, surname, rate };
            members.push(member);
            updateMemberSelects();
            alert('Miembro agregado exitosamente');
            clearInputs(['memberName', 'memberSurname', 'memberRate']);
        } else {
            alert("El miembro ya existe.");
        }
    } else {
        alert('Por favor, complete todos los campos con valores válidos.');
    }
}

// Función para actualizar los selects de los miembros
function updateMemberSelects() {
    const memberSelect = document.getElementById('memberSelect');
    const advanceMemberSelect = document.getElementById('advanceMemberSelect');
    memberSelect.innerHTML = '';
    advanceMemberSelect.innerHTML = '';

    members.forEach(member => {
        const option = new Option(`${member.name} ${member.surname}`, member.id);
        memberSelect.add(option);
        advanceMemberSelect.add(option.cloneNode(true));
    });
}

// Función para registrar horas trabajadas
function registerHours() {
    const memberId = parseInt(document.getElementById('memberSelect').value);
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);
    const workDate = document.getElementById('workDate').value;
    const workLocation = document.getElementById('workLocation').value.trim();

    if (memberId && hoursWorked > 0 && workDate && workLocation) {
        records.push({ memberId, hoursWorked, workDate, workLocation, type: 'work' });
        alert('Horas registradas exitosamente');
        clearInputs(['hoursWorked', 'workDate', 'workLocation']);
    } else {
        alert('Por favor, complete todos los campos con valores válidos.');
    }
}

// Función para registrar anticipos
function registerAdvance() {
    const memberId = parseInt(document.getElementById('advanceMemberSelect').value);
    const advanceAmount = parseFloat(document.getElementById('advanceAmount').value);

    if (memberId && advanceAmount > 0) {
        records.push({ memberId, advanceAmount, type: 'advance' });
        alert('Anticipo registrado exitosamente');
        clearInputs(['advanceAmount']);
    } else {
        alert('Por favor, complete todos los campos con valores válidos.');
    }
}

// Función para generar el resumen semanal
function generateWeeklySummary() {
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = '';
    if (records.length === 0) {
        summaryDiv.innerHTML = '<p>No hay registros disponibles.</p>';
        return;
    }
    members.forEach(member => {
        const memberRecords = records.filter(record => record.memberId === member.id);
        const totalHours = memberRecords.filter(record => record.type === 'work').reduce((sum, record) => sum + record.hoursWorked, 0);
        const totalAdvance = memberRecords.filter(record => record.type === 'advance').reduce((sum, record) => sum + record.advanceAmount, 0);
        const totalPay = totalHours * member.rate - totalAdvance;

        const memberSummary = `
            <h3>${member.name} ${member.surname}</h3>
            <p>Horas trabajadas: ${totalHours}</p>
            <p>Pago por hora: $${member.rate} MXN</p>
            <p>Anticipos: $${totalAdvance} MXN</p>
            <p>Total a pagar: $${totalPay} MXN</p>
            <hr>
        `;
        summaryDiv.innerHTML += memberSummary;
    });
}

// Función para restablecer solo los registros, sin borrar los miembros
function resetAllRecords() {
    if (confirm("¿Estás seguro de que deseas restablecer todos los registros y empezar de nuevo?")) {
        records.length = 0; // Limpia solo los registros de horas y anticipos
        document.getElementById('summary').innerHTML = ''; // Borra el resumen semanal
        alert("Los registros de horas y anticipos han sido restablecidos.");
        showSection('add-member-section');
    }
}


// Función para limpiar campos de entrada
function clearInputs(inputIds) {
    inputIds.forEach(id => document.getElementById(id).value = '');
}
