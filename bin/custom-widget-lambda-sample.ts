#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CustomWidgetLambdaSampleStack } from "../lib/custom-widget-lambda-sample-stack";

const app = new cdk.App();
new CustomWidgetLambdaSampleStack(app, "CustomWidgetLambdaSampleStack", {});
