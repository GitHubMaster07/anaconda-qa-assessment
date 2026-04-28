import { APIRequestContext } from '@playwright/test';

export class CleanupHelper {
  private static createdEmails: string[] = [];

  static trackEmail(email: string): void {
    this.createdEmails.push(email);
    console.log(`📝 Tracking email for cleanup: ${email}`);
  }

  static async cleanupAll(request: APIRequestContext): Promise<void> {
    for (const email of this.createdEmails) {
      try {
        // If API delete endpoint exists
        // await request.delete(`/api/users/${encodeURIComponent(email)}`);
        console.log(`🧹 Would clean up: ${email}`);
      } catch (error) {
        console.log(`⚠️ Cleanup failed for ${email}:`, error);
      }
    }
    this.createdEmails.length = 0; // Clear the array
  }

  static reset(): void {
    this.createdEmails = [];
  }
}