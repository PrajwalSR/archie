// Initialize Mermaid
mermaid.initialize({ startOnLoad: false, theme: 'default' });

// DOM Elements
const formSection = document.getElementById('formSection');
const resultsSection = document.getElementById('resultsSection');
const loadingSection = document.getElementById('loadingSection');
const errorSection = document.getElementById('errorSection');
const ideaForm = document.getElementById('ideaForm');
const startOverBtn = document.getElementById('startOverBtn');
const retryBtn = document.getElementById('retryBtn');

// Form submission handler
ideaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        idea: document.getElementById('idea').value,
        userCount: document.getElementById('userCount').value,
        compliance: document.getElementById('compliance').value,
        skillLevel: document.getElementById('skillLevel').value,
        timeline: document.getElementById('timeline').value
    };

    // Show loading state
    showSection('loading');

    try {
        // Call API
        const response = await fetch('/api/generate-architecture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || 'Failed to generate architecture');
        }

        const data = await response.json();

        // Display results
        displayResults(data);
        showSection('results');

    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
    }
});

// Display results in the UI
function displayResults(data) {
    // Summary
    document.getElementById('summaryText').textContent = data.summary;

    // Compliance Alert
    if (data.compliance_notes && data.compliance_notes.toLowerCase() !== 'none') {
        document.getElementById('complianceAlert').classList.remove('hidden');
        document.getElementById('complianceText').textContent = data.compliance_notes;
    } else {
        document.getElementById('complianceAlert').classList.add('hidden');
    }

    // Mermaid Diagram
    const mermaidElement = document.getElementById('mermaidDiagram');
    mermaidElement.textContent = data.mermaid_diagram;
    mermaid.run({ nodes: [mermaidElement] });

    // Tech Stack
    const techStackContent = document.getElementById('techStackContent');
    techStackContent.innerHTML = '';
    if (data.tech_stack) {
        for (const [key, value] of Object.entries(data.tech_stack)) {
            const techItem = document.createElement('div');
            techItem.className = 'tech-item';
            techItem.innerHTML = `
                <strong>${capitalizeFirst(key.replace(/_/g, ' '))}:</strong>
                <p>${value}</p>
            `;
            techStackContent.appendChild(techItem);
        }
    }

    // Component Explanations
    const explanationsContent = document.getElementById('componentExplanations');
    explanationsContent.innerHTML = '';
    if (data.component_explanations) {
        for (const [key, value] of Object.entries(data.component_explanations)) {
            const expItem = document.createElement('div');
            expItem.className = 'explanation-item';
            expItem.innerHTML = `
                <h4>${capitalizeFirst(key.replace(/_/g, ' '))}</h4>
                <p>${value}</p>
            `;
            explanationsContent.appendChild(expItem);
        }
    }

    // Scalability
    if (data.scalability_strategy) {
        document.getElementById('scalabilityText').textContent = data.scalability_strategy;
    }

    // First Steps
    const stepsList = document.getElementById('firstStepsList');
    stepsList.innerHTML = '';
    if (data.first_steps) {
        data.first_steps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            stepsList.appendChild(li);
        });
    }

    // Cost - Handle both old string format and new object format
    const costElement = document.getElementById('costText');
    if (data.cost_estimate) {
        if (typeof data.cost_estimate === 'string') {
            costElement.textContent = data.cost_estimate;
        } else if (typeof data.cost_estimate === 'object') {
            costElement.innerHTML = `
                <strong>Initial:</strong> ${data.cost_estimate.initial_monthly}<br>
                <strong>Year 1:</strong> ${data.cost_estimate.year_1_monthly}<br>
                ${data.cost_estimate.breakdown ? `<strong>Breakdown:</strong> ${data.cost_estimate.breakdown}` : ''}
            `;
        }
    }

    // Risks
    const risksList = document.getElementById('risksList');
    risksList.innerHTML = '';
    if (data.risks_and_gotchas) {
        data.risks_and_gotchas.forEach(risk => {
            const li = document.createElement('li');
            li.textContent = risk;
            risksList.appendChild(li);
        });
    }
}

// Show specific section
function showSection(section) {
    formSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    errorSection.classList.add('hidden');

    switch(section) {
        case 'form':
            formSection.classList.remove('hidden');
            break;
        case 'results':
            resultsSection.classList.remove('hidden');
            break;
        case 'loading':
            loadingSection.classList.remove('hidden');
            break;
        case 'error':
            errorSection.classList.remove('hidden');
            break;
    }
}

// Show error message
function showError(message) {
    document.getElementById('errorText').textContent = message;
    showSection('error');
}

// Start over button
startOverBtn.addEventListener('click', () => {
    ideaForm.reset();
    showSection('form');
});

// Retry button
retryBtn.addEventListener('click', () => {
    showSection('form');
});

// Utility function
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize - show form
showSection('form');
