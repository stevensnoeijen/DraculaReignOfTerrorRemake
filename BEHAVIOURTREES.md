# Behavoir trees

Legenda:
```mermaid
flowchart TD
    MultiCheck{Multi check}
    Check[/Check/]
    Task[Task]
```

## Units

### Swordsman

```mermaid
flowchart TD
Tree((Tree))
  Selector1{Selector}
    Sequence1{Sequence}
      EnemyInFovRange1[/EnemyInFovRange/]
      SetTarget[SetTarget]
    Sequence2{Sequence}
      Inverter1[/Invert/]
        IsMoving[/IsMoving/]
      Inverter2[/Invert/]
        EnemyInFovRange2[/EnemyInFovRange/]
      UnsetTarget[UnsetTarget]
    Sequence3{Sequence}
      HasTarget[/HasTarget/]
      Selector2{Selector}
        Sequence4{Sequence}
        EnemyInAttackRange[/EnemyInAttackRange/]
        Timer[/Timer/]
          Attack[Attack]
        Follow[Follow]

Tree --> Selector1
  Selector1 --> Sequence1
    Sequence1 --> EnemyInFovRange1
    Sequence1 --> SetTarget
  Selector1 --> Sequence2
    Sequence2 --> Inverter1
    Inverter1 --> IsMoving
    Sequence2 --> Inverter2
      Inverter2 --> EnemyInFovRange2
    Sequence2 --> UnsetTarget
  Selector1 --> Sequence3
    Sequence3 --> HasTarget
    Sequence3 --> Selector2
      Selector2 --> Sequence4
        Sequence4 --> EnemyInAttackRange
        Sequence4 --> Timer
          Timer --> Attack
      Selector2 --> Follow
 
```