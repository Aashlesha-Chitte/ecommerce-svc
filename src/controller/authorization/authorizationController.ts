import { NextFunction, Request, Response } from 'express';
import { authorizationService } from '../../services';

class AuthorizationController {
  public static getInstance(): AuthorizationController {
    if (!AuthorizationController.instance) {
      AuthorizationController.instance = new AuthorizationController();
    }
    return AuthorizationController.instance;
  }
  private static instance: AuthorizationController;

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    return authorizationService.signup(req, res, next);
  };
  public login = async (req: Request, res: Response, next: NextFunction) => {
    return authorizationService.login(req, res, next);
  };

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    return authorizationService.getUser(req, res, next);
  };

}

export default AuthorizationController.getInstance();