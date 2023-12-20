import { Customer } from './customer';
import {createComponent} from "@angular/core";
import {Observable} from "rxjs";
import { Injectable } from "@angular/core";
import {createObject} from "rxjs/internal/util/createObject";
import any = jasmine.any;

describe('Customer', () => {
  it('should create an instance', () => {
    expect(new Customer()).toBeTruthy();
  });
});

