const headerHtml = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary flex-column p-3">
        <div class="container-fluid">
    
            <a href="index.html" class="navbar-brand" id="pageTitle" data-i18n="pageTitle">
            </a>
    
            <div class="d-flex">
                <select id="langSelect" class="form-select form-select-sm w-auto">
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                </select>
            </div>
    
        </div>
    
        <div class="container-fluid">
            <nav aria-label="breadcrumb">
                <ol id="breadcrumb" class="breadcrumb breadcrumb-inside-nav mb-0">
                </ol>
            </nav>
        </div>
    </nav>
`;

export default headerHtml;
