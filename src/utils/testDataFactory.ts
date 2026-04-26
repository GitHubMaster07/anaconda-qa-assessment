import { randomUUID } from 'crypto';

export class TestDataFactory {
  // Generate unique email using UUID - guaranteed unique
  static generateUniqueEmail(): string {
    const uuid = randomUUID().substring(0, 8);
    return `test-${uuid}@example.com`;
  }

  // Generate password using UUID
  static generatePassword(): string {
    const uuid = randomUUID().substring(0, 10);
    return `Pass${uuid}!`;
  }

  static generateTestUser() {
    return {
      email: this.generateUniqueEmail(),
      password: this.generatePassword(),
    };
  }

  // Create multiple users
  static generateMultipleUsers(count: number) {
    return Array.from({ length: count }, () => this.generateTestUser());
  }
}