const members = [];
const records = [];

// Muestra la secci�n seleccionada y oculta las dem�s
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Funci�n para agregar un miembro al grupo
function addMember() {
    const name = document.getElementById('memberName').value;
    const surname = document.getElementById('memberSurname').value;
    const rate = parseFloat(document.getElementById('memberRate').value);

    if (name && surname && rate) {
        const member = { id: members.length + 1, name, surname, rate };
        members.push(member);
        updateMemberSelects();
        alert('Miembro agregado exitosamente');
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Funci�n para actualizar los selects de los miembros
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

// Funci�n para registrar horas trabajadas
function registerHours() {
    const memberId = parseInt(document.getElementById('memberSelect').value);
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);
    const workDate = document.getElementById('workDate').value;
    const workLocation = document.getElementById('workLocation').value;

    if (memberId && hoursWorked && workDate && workLocation) {
        records.push({ memberId, hoursWorked, workDate, workLocation, type: 'work' });
        alert('Horas registradas exitosamente');
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Funci�n para registrar anticipos
function registerAdvance() {
    const memberId = parseInt(document.getElementById('advanceMemberSelect').value);
    const advanceAmount = parseFloat(document.getElementById('advanceAmount').value);

    if (memberId && advanceAmount) {
        records.push({ memberId, advanceAmount, type: 'advance' });
        alert('Anticipo registrado exitosamente');
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Funci�n para generar el resumen semanal
function generateWeeklySummary() {
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = '';
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

// Muestra la secci�n de agregar miembro por defecto
showSection('add-member-section');
function resetAllRecords() {
    // Confirma antes de eliminar todos los registros y miembros
    if (confirm("�Est�s seguro de que deseas restablecer todos los registros y empezar de nuevo?")) {
        members.length = 0;  // Vac�a la lista de miembros
        records.length = 0;  // Vac�a la lista de registros
        updateMemberSelects();  // Actualiza la interfaz
        document.getElementById('summary').innerHTML = '';  // Limpia el resumen semanal
        alert("Todos los registros han sido restablecidos.");
        // Muestra nuevamente la secci�n para agregar miembro
        showSection('add-member-section');
    }
}
