# Contributing to GramSathi

Thank you for your interest in contributing to GramSathi! This document provides guidelines for contributing to this rural empowerment platform.

## 🤝 How to Contribute

### 1. Fork the Repository
- Fork the GramSathi repository to your GitHub account
- Clone your fork locally

### 2. Set Up Development Environment
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/gramsathi.git
cd gramsathi

# Set up backend
cd backend
pip install -r requirements.txt

# Set up frontend
cd ../frontend
npm install
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 5. Test Your Changes
```bash
# Test backend
cd backend
python main.py

# Test frontend
cd frontend
npm start
```

### 6. Submit a Pull Request
- Push your changes to your fork
- Create a pull request with a clear description
- Reference any related issues

## 📋 Development Guidelines

### Code Style
- **Python**: Follow PEP 8 guidelines
- **JavaScript**: Use ES6+ features and consistent formatting
- **CSS**: Use utility-first approach with clear naming

### Commit Messages
Use conventional commit format:
```
feat: add new government scheme API endpoint
fix: resolve weather data fetching issue
docs: update installation instructions
```

### Testing
- Add unit tests for new backend endpoints
- Test frontend components thoroughly
- Ensure mobile responsiveness

## 🌟 Areas for Contribution

### High Priority
- [ ] Real API integrations (OpenWeatherMap, OpenAI)
- [ ] Enhanced multilingual support
- [ ] Mobile app development
- [ ] Performance optimizations

### Medium Priority
- [ ] Additional government schemes
- [ ] More crop varieties in recommendations
- [ ] Enhanced UI/UX improvements
- [ ] Accessibility features

### Documentation
- [ ] API documentation improvements
- [ ] User guides and tutorials
- [ ] Video demonstrations
- [ ] Translation of documentation

## 🐛 Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details

## 💡 Feature Requests

For new features:
- Describe the problem it solves
- Explain the proposed solution
- Consider rural user needs
- Think about offline capabilities

## 📞 Community

- **Issues**: Use GitHub Issues for bugs and features
- **Discussions**: Use GitHub Discussions for questions
- **Email**: contact@gramsathi.com (if available)

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for helping make digital services accessible to rural communities! 🙏
