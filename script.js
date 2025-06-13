
        // Wait for the DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Variables for terminal functionality
            const terminalInput = document.getElementById('terminal-input');
            const commandHistory = document.getElementById('command-history');
            const inputSection = document.getElementById('terminal-input-section');
            const welcomeMessage = document.getElementById('welcome-message');
            const npmInstallation = document.getElementById('npm-installation');
            const npmLog = document.getElementById('npm-log');
            
            // Execute button
            const executeBtn = document.getElementById('execute-btn');
            
            // Terminal commands functionality
            function handleCommand(command) {
                const input = command || terminalInput.value.trim();
                if (!input) return;
                
                // Add command to history
                const commandElement = addCommandToHistory(input);
                
                // Clear input
                terminalInput.value = '';
                
                // Process command
                processCommand(input.toLowerCase(), commandElement);
            }
            
            function addCommandToHistory(command) {
                const commandElement = document.createElement('div');
                commandElement.classList.add('command-line', 'fade-in');
                commandElement.innerHTML = `
                    <div class="flex items-start">
                        <span class="text-purple-400 mr-2">$</span>
                        <div class="break-all font-mono">${command}</div>
                    </div>
                    <div id="command-output" class="mt-2"></div>
                `;
                commandHistory.appendChild(commandElement);
                
                // Scroll to bottom
                setTimeout(() => {
                    commandElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 10);
                
                return commandElement.querySelector('#command-output');
            }
            
            function processCommand(command, outputContainer) {
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
                    // Add event listeners to project demo and repo buttons
                    document.querySelectorAll('.demo-btn').forEach(btn => {
                        btn.addEventListener('click', function() {
                            const project = this.getAttribute('data-project');
                            openProjectViewer(project);
                        });
                    });
                    document.querySelectorAll('.repo-btn').forEach(btn => {
                        btn.addEventListener('click', function() {
                            const project = this.getAttribute('data-project');
                            openRepository(project);
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
                outputContainer.innerHTML = `
                    <div class="text-red-400 font-mono">Error: Command not found: "${command}"</div>
                    <div class="text-gray-400 mt-1">Try <span class="command" onclick="handleCommand('help')">"help"</span> to see available commands</div>
                `;
            }
            
            // Project viewer functionality
            function openProjectViewer(project) {
                const projectViewer = document.getElementById('project-viewer');
                const projectTitle = document.getElementById('project-title').querySelector('span');
                const projectFrame = document.getElementById('project-frame');
                const projectUrl = document.getElementById('project-url').querySelector('span');
                
                // Set project details based on selection
                switch(project) {
                    case 'skillswap':
                        projectTitle.textContent = 'SkillSwap';
                        projectUrl.textContent = 'https://skillswap.naitik.dev';
                        projectFrame.src = 'https://skillswap.naitik.dev';
                        break;
                    case 'tracker':
                        projectTitle.textContent = 'Productivity Tracker';
                        projectUrl.textContent = 'https://tracker.naitik.dev';
                        projectFrame.src = 'https://tracker.naitik.dev';
                        break;
                    case 'gaming':
                        projectTitle.textContent = 'Gaming ID Marketplace';
                        projectUrl.textContent = 'https://gaming.naitik.dev';
                        projectFrame.src = 'https://gaming.naitik.dev';
                        break;
                    default:
                        projectTitle.textContent = 'Project Demo';
                        projectUrl.textContent = 'https://naitik.dev/projects';
                        projectFrame.src = 'https://naitik.dev/projects';
                }
                
                // Show the modal
                projectViewer.classList.remove('hidden');
                
                // Close button event
                document.getElementById('close-viewer').onclick = function() {
                    projectViewer.classList.add('hidden');
                    projectFrame.src = '';
                };
                
                // Fullscreen button event
                document.getElementById('fullscreen-btn').onclick = function() {
                    if (projectFrame.requestFullscreen) {
                        projectFrame.requestFullscreen();
                    } else if (projectFrame.webkitRequestFullscreen) {
                        projectFrame.webkitRequestFullscreen();
                    } else if (projectFrame.msRequestFullscreen) {
                        projectFrame.msRequestFullscreen();
                    }
                };
                
                // Open in new tab button event
                document.getElementById('open-new-btn').onclick = function() {
                    window.open(projectFrame.src, '_blank');
                };
                
                // Copy URL button event
                document.getElementById('copy-url-btn').onclick = function() {
                    navigator.clipboard.writeText(projectUrl.textContent).then(() => {
                        const btn = document.getElementById('copy-url-btn');
                        btn.innerHTML = '<i class="fas fa-check mr-1"></i>Copied!';
                        setTimeout(() => {
                            btn.innerHTML = '<i class="fas fa-copy mr-1"></i>Copy URL';
                        }, 2000);
                    });
                };
            }
            
            // Open repository functionality
            function openRepository(project) {
                let repoUrl;
                switch(project) {
                    case 'skillswap':
                        repoUrl = 'https://github.com/NAITIK-builds/skillswap';
                        break;
                    case 'tracker':
                        repoUrl = 'https://github.com/NAITIK-builds/productivity-tracker';
                        break;
                    case 'gaming':
                        repoUrl = 'https://github.com/NAITIK-builds/gaming-marketplace';
                        break;
                    default:
                        repoUrl = 'https://github.com/NAITIK-builds';
                }
                window.open(repoUrl, '_blank');
            }
            
            // Email modal functionality
            function openEmailModal() {
                const emailModal = document.getElementById('email-modal');
                emailModal.classList.remove('hidden');
                
                // Close button event
                document.getElementById('close-modal').onclick = function() {
                    emailModal.classList.add('hidden');
                    clearEmailForm();
                };
                
                // Send message button event
                document.getElementById('send-message').onclick = function() {
                    const senderName = document.getElementById('sender-name').value.trim();
                    const senderEmail = document.getElementById('sender-email').value.trim();
                    const messageContent = document.getElementById('message-content').value.trim();
                    const statusMessage = document.getElementById('status-message');
                    
                    // Validate inputs
                    if (!senderName || !senderEmail || !messageContent) {
                        statusMessage.textContent = 'Please fill in all fields.';
                        statusMessage.classList.remove('hidden', 'bg-green-900/50');
                        statusMessage.classList.add('bg-red-900/50', 'text-red-400');
                        return;
                    }
                    
                    // Validate email format
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(senderEmail)) {
                        statusMessage.textContent = 'Please enter a valid email address.';
                        statusMessage.classList.remove('hidden', 'bg-green-900/50');
                        statusMessage.classList.add('bg-red-900/50', 'text-red-400');
                        return;
                    }
                    
                    // Show sending status
                    document.getElementById('send-text').classList.add('hidden');
                    document.getElementById('sending-text').classList.remove('hidden');
                    document.getElementById('send-message').disabled = true;
                    
                    // Simulate sending email (replace with actual API call in production)
                    setTimeout(() => {
                        // Show success message
                        statusMessage.textContent = 'Message sent successfully! Naitik will respond soon.';
                        statusMessage.classList.remove('bg-red-900/50', 'text-red-400');
                        statusMessage.classList.add('bg-green-900/50', 'text-green-400', 'hidden');
                        
                        // Reset form
                        clearEmailForm();
                        
                        // Reset button
                        document.getElementById('send-text').classList.remove('hidden');
                        document.getElementById('sending-text').classList.add('hidden');
                        document.getElementById('send-message').disabled = false;
                        
                        // Auto-close after 3 seconds
                        setTimeout(() => {
                            emailModal.classList.add('hidden');
                            statusMessage.classList.add('hidden');
                        }, 3000);
                    }, 2000);
                };
            }
            
            function clearEmailForm() {
                document.getElementById('sender-name').value = '';
                document.getElementById('sender-email').value = '';
                document.getElementById('message-content').value = '';
                document.getElementById('status-message').classList.add('hidden');
            }
            
            // NPM-style installation animation on load
            function runNpmInstallation() {
                const npmLogs = [
                    { text: 'added 1423 packages in 18s', delay: 1500, type: 'info' },
                    { text: 'installing react@18.2.0...', delay: 600, type: 'success' },
                    { text: 'installing tailwindcss@3.4.1...', delay: 400, type: 'success' },
                    { text: 'installing express@4.18.2...', delay: 500, type: 'success' },
                    { text: 'installing mongodb@6.0.0...', delay: 300, type: 'success' },
                    { text: 'building native dependencies...', delay: 1800, type: 'info' },
                    { text: 'configuring environment...', delay: 2000, type: 'warning' },
                    { text: 'compiling assets...', delay: 1500, type: 'info' },
                    { text: 'loading user data...', delay: 1200, type: 'info' },
                    { text: 'optimizing build...', delay: 1000, type: 'info' },
                    { text: 'starting terminal...', delay: 800, type: 'info' },
                    { text: 'installation complete!', delay: 600, type: 'success' }
                ];
                
                let totalDelay = 0;
                
                npmLogs.forEach(log => {
                    totalDelay += log.delay;
                    setTimeout(() => {
                        const line = document.createElement('div');
                        line.classList.add('npm-line', `log-${log.type}`);
                        
                        let icon = '';
                        switch (log.type) {
                            case 'success':
                                icon = `<span class="text-green-500 mr-2">✓</span>`;
                                break;
                            case 'warning':
                                icon = `<span class="text-yellow-500 mr-2">⚠</span>`;
                                break;
                            case 'info':
                                icon = `<span class="text-blue-500 mr-2">ℹ</span>`;
                                break;
                        }
                        
                        line.innerHTML = `${icon}${log.text}`;
                        npmLog.appendChild(line);
                        
                        // Scroll to bottom
                        npmLog.parentElement.scrollTop = npmLog.parentElement.scrollHeight;
                    }, totalDelay);
                });
                
                // Show welcome message and input after installation
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
            
            // Execute button click
            executeBtn.addEventListener('click', function() {
                handleCommand();
            });
            
            // Handle command clicks
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('command')) {
                    const cmd = e.target.textContent.replace(/"/g, '').trim();
                    terminalInput.value = cmd;
                    handleCommand(cmd);
                }
                
                // Focus input when clicking terminal body
                const terminalBody = document.querySelector('.terminal-body');
                if (terminalBody.contains(e.target) && !e.target.closest('#email-modal')) {
                    terminalInput.focus();
                }
            });
            
            // Handle mobile keyboard
            let lastHeight = window.innerHeight;
            window.addEventListener('resize', function() {
                if (window.innerHeight < lastHeight && window.innerHeight < window.outerHeight) {
                    // Keyboard likely visible
                    setTimeout(() => {
                        inputSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }, 300);
                }
                lastHeight = window.innerHeight;
            });
        });
        