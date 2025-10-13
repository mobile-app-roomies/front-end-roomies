/**
 * FICHIER DE TEST POUR SONARCLOUD
 * Ce fichier contient intentionnellement des vulnérabilités pour tester SonarCloud
 * NE PAS UTILISER EN PRODUCTION
 */

import * as crypto from 'crypto';

export class SecurityTestService {
  // HIGH VULNERABILITY: Hardcoded credentials
  private static readonly API_KEY = 'sk-1234567890abcdefghijklmnopqrstuvwxyz'; // NOSONAR - Test intentionnel
  private static readonly DATABASE_PASSWORD = 'admin123'; // NOSONAR - Test intentionnel

  // MEDIUM VULNERABILITY 1: Weak cryptographic algorithm (MD5)
  static hashPasswordWeak(password: string): string {
    // MD5 is cryptographically broken and should not be used
    return crypto.createHash('md5').update(password).digest('hex');
  }

  // MEDIUM VULNERABILITY 2: SQL Injection risk
  static buildUnsafeQuery(userId: string, tableName: string): string {
    // Direct string concatenation creates SQL injection vulnerability
    return `SELECT * FROM ${tableName} WHERE user_id = '${userId}'`;
  }

  // LOW VULNERABILITY: Console.log in production code
  static debugUserData(userData: any): void {
    // Logging sensitive data can expose information
    console.log('User data:', userData);
    console.log('API Key:', this.API_KEY);
  }

  // Additional code smell: Unused variable
  static processData(): void {
    const unusedVariable = 'This variable is never used';
    const result = Math.random();
    return;
  }

  // Cognitive complexity issue
  static complexFunction(a: number, b: number, c: number): number {
    if (a > 0) {
      if (b > 0) {
        if (c > 0) {
          if (a > b) {
            if (b > c) {
              return a + b + c;
            } else {
              return a - b - c;
            }
          } else {
            if (a > c) {
              return b + a + c;
            } else {
              return c + b + a;
            }
          }
        }
      }
    }
    return 0;
  }

  // Insecure random number generation
  static generateToken(): string {
    // Math.random() is not cryptographically secure
    return Math.random().toString(36).substring(2);
  }
}
