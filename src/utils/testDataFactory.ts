export class TestDataFactory {
  // Generate unique email for parallel test execution
  static generateUniqueEmail(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `test-${timestamp}-${random}@example.com`;
  }

  static generatePassword(): string {
    return `Pass${Math.random().toString(36).substring(2, 12)}!`;
  }

  static generateTestUser() {
    return {
      email: this.generateUniqueEmail(),
      password: this.generatePassword(),
    };
  }

  // Create multiple users for Challenge 1 (3 login attempts)
  static generateMultipleUsers(count: number) {
    return Array.from({ length: count }, () => this.generateTestUser());
  }
}