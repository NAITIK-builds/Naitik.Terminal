
        // Wait for the DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Variables for terminal functionality
            const terminalInput = document.getElementById('terminal-input');
            const commandHistory = document.getElementById('command-history');
            const inputSection = document.getElementById('terminal-input-section');
            const welcomeMessage = document.getElementById('welcome-message');
            const npmInstallation = document.getElementById('npm-installation');
            const npmLog = document.getElementById('npm-log');
            
            // Terminal commands functionality
            function handleCommand(command) {
                const input = command || terminalInput.value.trim();
                if (!input) return;

                // Add command to history
                addCommandToHistory(input);
                
                // Clear input
                terminalInput.value = '';
                
                // Process command
                processCommand(input.toLowerCase());
            }
            
            function addCommandToHistory(command) {
                const commandElement = document.createElement('div');
                commandElement.classList.add('command-line');
                commandElement.innerHTML = `
                    <div class="flex items-start">
                        <span class="text-purple-400 mr-2">$</span>
                        <div>${command}</div>
                    </div>
                    <div id="command-output" class="mt-1"></div>
                `;
                commandHistory.appendChild(commandElement);
                return commandElement;
            }
            
            function processCommand(command) {
                const outputContainer = document.querySelector('#command-history .command-line:last-child #command-output');
                
                // Clear command
                if (command === 'clear') {
                    commandHistory.innerHTML = '';
                    return;
                }
                
                // Help command
                if (command === 'help') {
                    outputContainer.innerHTML = document.getElementById('help-content').innerHTML;
                    return;
                }
                
                // Personal info command
                if (command === 'personal') {
                    outputContainer.innerHTML = document.getElementById('personal-info-content').innerHTML;
                    return;
                }
                
                // Education command
                if (command === 'education') {
                    outputContainer.innerHTML = document.getElementById('education-content').innerHTML;
                    return;
                }
                
                // Skills command
                if (command === 'skills') {
                    outputContainer.innerHTML = document.getElementById('skills-content').innerHTML;
                    return;
                }
                
                // Projects command
                if (command === 'projects') {
                    outputContainer.innerHTML = document.getElementById('projects-content').innerHTML;
                    // Add event listeners to project demo buttons
                    document.querySelectorAll('.demo-btn').forEach(btn => {
                        btn.addEventListener('click', function() {
                            const project = this.getAttribute('data-project');
                            openProjectViewer(project);
                        });
                    });
                    return;
                }
                
                // Contact command
                if (command === 'contact') {
                    outputContainer.innerHTML = document.getElementById('contact-content').innerHTML;
                    return;
                }
                
                // Send email command
                if (command === 'sendmail') {
                    openEmailModal();
                    return;
                }
                
                // Unknown command
                outputContainer.innerHTML = `<div class="text-red-400">Command not found: "${command}"</div>
                                            <div class="text-gray-400">Type <span class="command" onclick="handleCommand('help')">"help"</span> to see available commands</div>`;
            }
            
            // Project viewer functionality
            function openProjectViewer(project) {
                const projectViewer = document.getElementById('project-viewer');
                const projectTitle = document.getElementById('project-title');
                const projectFrame = document.getElementById('project-frame');
                const projectUrl = document.getElementById('project-url');
                
                // Set project details based on selection
                switch(project) {
                    case 'skillswap':
                        projectTitle.textContent = 'SkillSwap Demo';
                        projectUrl.textContent = 'https://skillswap.naitik.dev (demo)';
                        projectFrame.src = 'https://skillswap.naitik.dev';
                        break;
                    case 'tracker':
                        projectTitle.textContent = 'Productivity Tracker Demo';
                        projectUrl.textContent = 'https://tracker.naitik.dev (demo)';
                        projectFrame.src = 'https://tracker.naitik.dev';
                        break;
                    default:
                        projectTitle.textContent = 'Project Demo';
                        projectUrl.textContent = 'https://naitik.dev/projects';
                        projectFrame.src = 'https://naitik.dev/projects';
                }
                
                // Show the modal
                projectViewer.classList.remove('hidden');
                
                // Close button event
                document.getElementById('close-viewer').addEventListener('click', function() {
                    projectViewer.classList.add('hidden');
                    projectFrame.src = '';
                });
                
                // Fullscreen button event
                document.getElementById('fullscreen-btn').addEventListener('click', function() {
                    if (projectFrame.requestFullscreen) {
                        projectFrame.requestFullscreen();
                    } else if (projectFrame.webkitRequestFullscreen) {
                        projectFrame.webkitRequestFullscreen();
                    } else if (projectFrame.msRequestFullscreen) {
                        projectFrame.msRequestFullscreen();
                    }
                });
                
                // Open in new tab button event
                document.getElementById('open-new-btn').addEventListener('click', function() {
                    window.open(projectFrame.src, '_blank');
                });
            }
            
            // Email modal functionality
            function openEmailModal() {
                const emailModal = document.getElementById('email-modal');
                emailModal.classList.remove('hidden');
                
                // Close button event
                document.getElementById('close-modal').addEventListener('click', function() {
                    emailModal.classList.add('hidden');
                });
                
                // Send message button event
                document.getElementById('send-message').addEventListener('click', function() {
                    const senderName = document.getElementById('sender-name').value.trim();
                    const senderEmail = document.getElementById('sender-email').value.trim();
                    const messageContent = document.getElementById('message-content').value.trim();
                    const statusMessage = document.getElementById('status-message');
                    
                    // Validate inputs
                    if (!senderName || !senderEmail || !messageContent) {
                        statusMessage.textContent = 'Please fill in all fields.';
                        statusMessage.classList.remove('hidden');
                        statusMessage.classList.add('text-red-400');
                        return;
                    }
                    
                    // Show sending status
                    document.getElementById('send-text').classList.add('hidden');
                    document.getElementById('sending-text').classList.remove('hidden');
                    
                    // Simulate sending email (in a real app, you would use an API here)
                    setTimeout(() => {
                        // Show success message
                        statusMessage.textContent = 'Message sent successfully! Naitik will respond soon.';
                        statusMessage.classList.remove('text-red-400');
                        statusMessage.classList.add('text-green-400');
                        statusMessage.classList.remove('hidden');
                        
                        // Reset form
                        document.getElementById('sender-name').value = '';
                        document.getElementById('sender-email').value = '';
                        document.getElementById('message-content').value = '';
                        
                        // Reset button
                        document.getElementById('send-text').classList.remove('hidden');
                        document.getElementById('sending-text').classList.add('hidden');
                        
                        // Auto-close after 3 seconds
                        setTimeout(() => {
                            emailModal.classList.add('hidden');
                            statusMessage.classList.add('hidden');
                        }, 3000);
                    }, 2000);
                });
            }
            
            // Browser modal functionality
            const browserModal = document.getElementById('browser-modal');
            const browserFrame = document.getElementById('browser-frame');
            const browserUrl = document.getElementById('browser-url');
            const browserLoading = document.getElementById('browser-loading');
            
            // Toggle browser button
            document.getElementById('browser-toggle').addEventListener('click', function() {
                browserModal.classList.remove('hidden');
                browserUrl.focus();
            });
            
            // Close browser button
            document.getElementById('close-browser').addEventListener('click', function() {
                browserModal.classList.add('hidden');
                browserFrame.src = '';
            });
            
            // URL input event
            browserUrl.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    let url = browserUrl.value.trim();
                    if (!url.startsWith('http://') && !url.startsWith('https://')) {
                        url = 'https://' + url;
                    }
                    
                    browserLoading.classList.remove('hidden');
                    browserFrame.src = url;
                    
                    // Hide loading when frame loads
                    browserFrame.addEventListener('load', function() {
                        browserLoading.classList.add('hidden');
                    }, { once: true });
                }
            });
            
            // Browser navigation buttons
            document.getElementById('browser-back').addEventListener('click', function() {
                if (browserFrame.contentWindow.history.length > 1) {
                    browserFrame.contentWindow.history.back();
                }
            });
            
            document.getElementById('browser-forward').addEventListener('click', function() {
                browserFrame.contentWindow.history.forward();
            });
            
            document.getElementById('browser-refresh').addEventListener('click', function() {
                browserFrame.contentWindow.location.reload();
            });
            
            document.getElementById('browser-home').addEventListener('click', function() {
                browserFrame.src = 'https://google.com';
                browserUrl.value = 'https://google.com';
            });
            
            // Update browser URL when frame navigates
            browserFrame.addEventListener('load', function() {
                if (browserFrame.src && browserFrame.src !== 'about:blank') {
                    browserUrl.value = browserFrame.contentWindow.location.href;
                }
            });
            
            // NPM-style installation animation on load
            function runNpmInstallation() {
                const npmLogs = [
                    {text: 'added 1268 packages in 15s', delay: 1500, type: 'info'},
                    {text: 'installing react@18.2.0...', delay: 500, type: 'success'},
                    {text: 'installing tailwindcss@3.3.0...', delay: 300, type: 'success'},
                    {text: 'installing express@4.18.2...', delay: 400, type: 'success'},
                    {text: 'installing mongodb@5.0.1...', delay: 200, type: 'success'},
                    {text: 'building native dependencies...', delay: 2000, type: 'info'},
                    {text: 'preparing environment...', delay: 2000, type: 'warning'},
                    {text: 'configuring portfolio terminal...', delay: 1500, type: 'info'},
                    {text: 'loading personal data...', delay: 1200, type: 'info'},
                    {text: 'compiling stylesheets...', delay: 1000, type: 'info'},
                    {text: 'optimizing build...', delay: 1200, type: 'info'},
                    {text: 'preparing interactive shell...', delay: 1000, type: 'info'},
                    {text: 'initialization complete!', delay: 800, type: 'success'}
                ];
                
                let totalDelay = 0;
                
                npmLogs.forEach(log => {
                    totalDelay += log.delay;
                    setTimeout(() => {
                        const line = document.createElement('div');
                        line.classList.add('npm-line');
                        
                        // Add icon based on log type
                        let icon = '';
                        if (log.type === 'success') {
                            icon = `<span class="text-green-500 mr-2">✓</span>`;
                        } else if (log.type === 'warning') {
                            icon = `<span class="text-yellow-500 mr-2">⚠</span>`;
                        } else if (log.type === 'info') {
                            icon = `<span class="text-blue-500 mr-2">ℹ</span>`;
                        }
                        
                        line.innerHTML = `${icon}${log.text}`;
                        npmLog.appendChild(line);
                        
                        // Scroll to bottom
                        npmLog.parentElement.scrollTop = npmLog.parentElement.scrollHeight;
                    }, totalDelay);
                });
                
                // When installation is complete, hide npm installation and show welcome message
                setTimeout(() => {
                    npmInstallation.classList.add('hidden');
                    welcomeMessage.classList.remove('hidden');
                    inputSection.classList.remove('hidden');
                    terminalInput.focus();
                }, totalDelay + 500);
            }
            
            // Start the NPM installation animation
            runNpmInstallation();
            
            // Event listeners for terminal input
            terminalInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleCommand();
                }
            });
            
            // Allow clicking on terminal commands (green text)
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('command')) {
                    handleCommand(e.target.textContent.replace(/"/g, '').trim());
                }
                
                // Focus input when clicking anywhere in terminal
                const terminalBody = document.querySelector('.flex-1.bg-gray-900');
                if (terminalBody.contains(e.target) && !browserModal.contains(e.target)) {
                    terminalInput.focus();
                }
            });
        });
    